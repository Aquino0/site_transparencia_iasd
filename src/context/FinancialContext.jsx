import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const FinancialContext = createContext();

// Sanitiza strings removendo tags HTML/script para prevenir XSS armazenado no localStorage
function sanitizeString(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/<script[\s\S]*?<\/script>/gi, '') // Remove blocos <script>
        .replace(/<[^>]+>/g, '')                      // Remove qualquer outra tag HTML
        .trim();
}

function sanitizeSettings(rawSettings) {
    if (!rawSettings || typeof rawSettings !== 'object') return rawSettings;
    return {
        ...rawSettings,
        churchName: sanitizeString(rawSettings.churchName),
        welcomeText: sanitizeString(rawSettings.welcomeText),
        bibleVerse: rawSettings.bibleVerse ? {
            text: sanitizeString(rawSettings.bibleVerse.text),
            reference: sanitizeString(rawSettings.bibleVerse.reference),
        } : rawSettings.bibleVerse,
    };
}

export function FinancialProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const selectedDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`);
    const [isAdmin, setIsAdmin] = useState(false);
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('iasd_settings');
        const defaults = {
            churchName: "IASD Vila Pinheiro",
            welcomeText: "Este portal apresenta a destinação fiel dos recursos sagrados entregues à igreja.",
            bibleVerse: {
                text: "Ora, o que se requer dos despenseiros é que cada um deles seja encontrado fiel.",
                reference: "1 Coríntios 4:2"
            },
            visibleMonths: []
        };

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const sanitized = sanitizeSettings(parsed);
                return { ...defaults, ...sanitized, visibleMonths: parsed.visibleMonths || [] };
            } catch {
                // Se o JSON estiver corrompido, descarta e usa os defaults
                localStorage.removeItem('iasd_settings');
                return defaults;
            }
        }
        return defaults;
    });

    // Carregar Transações do Supabase
    useEffect(() => {
        // fetchTransactions agora é chamado pelo useEffect abaixo junto com fetchMonthlyStats
    }, []);

    // Verificar sessão de admin ativa
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAdmin(!!session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAdmin(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function fetchTransactions() {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: true });

            if (error) throw error;
            if (data) setTransactions(data || []);
        } catch (error) {
            console.error('Erro ao buscar transações:', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const addTransaction = async (transaction) => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .insert([{
                    ...transaction,
                    value: parseFloat(transaction.value)
                }])
                .select();

            if (error) throw error;

            if (data) {
                setTransactions(prev => [data[0], ...prev]);
                return true;
            }
        } catch (error) {
            toast.error('Erro ao salvar: ' + error.message);
            return false;
        }
    };

    const removeTransaction = async (id) => {
        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setTransactions(prev => prev.filter(t => t.id !== id));
            return true;
        } catch (error) {
            toast.error('Erro ao excluir: ' + error.message);
            return false;
        }
    };

    const updateTransaction = async (id, updatedData) => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .update({
                    ...updatedData,
                    value: parseFloat(updatedData.value)
                })
                .eq('id', id)
                .select();

            if (error) throw error;

            if (data) {
                setTransactions(prev => prev.map(t => t.id === id ? data[0] : t));
                return true;
            }
        } catch (error) {
            toast.error('Erro ao atualizar: ' + error.message);
            return false;
        }
    };

    const [monthlyStats, setMonthlyStats] = useState(null);

    // Carregar Transações e Estatísticas do Supabase
    useEffect(() => {
        let isActive = true;

        async function loadStats() {
            try {
                const { data, error } = await supabase
                    .from('monthly_stats')
                    .select('*')
                    .eq('month_key', selectedMonth)
                    .maybeSingle();

                if (!isActive) return;

                if (error) throw error;

                // Se não existir, retorna objeto vazio/zerado para não quebrar a UI
                setMonthlyStats(data || {
                    regular_members: 0,
                    tithers_count: 0,
                    offerers_count: 0,
                    non_contributors_count: 0
                });
            } catch (error) {
                console.error('Erro ao buscar estatísticas:', error.message);
            }
        }

        loadStats();

        return () => {
            isActive = false;
        };
    }, [selectedMonth]); // Recarregar estatísticas quando mudar o mês

    // Carregar transações apenas uma vez no mount (ou quando necessário)
    useEffect(() => {
        fetchTransactions();
    }, []);

    async function updateMonthlyStats(stats) {
        try {
            // Verifica se já existe registro para o mês
            const { data: existing } = await supabase
                .from('monthly_stats')
                .select('id')
                .eq('month_key', selectedMonth)
                .single();

            let result;
            if (existing) {
                // Atualiza
                result = await supabase
                    .from('monthly_stats')
                    .update(stats)
                    .eq('month_key', selectedMonth)
                    .select();
            } else {
                // Cria novo
                result = await supabase
                    .from('monthly_stats')
                    .insert([{ ...stats, month_key: selectedMonth }])
                    .select();
            }

            if (result.error) throw result.error;

            setMonthlyStats(result.data[0]);
            return true;
        } catch (error) {
            toast.error('Erro ao salvar estatísticas: ' + error.message);
            return false;
        }
    }

    async function fetchSettings() {
        try {
            const { data, error } = await supabase
                .from('app_settings')
                .select('value')
                .eq('key', 'general')
                .single();

            if (error) {
                // Se der erro (ex: offline, ou tabela não existe), tenta usar o localStorage como fallback
                // Mas não sobrescreve se o erro for apenas de conexão
                console.error('Erro ao buscar configurações:', error.message);
                return;
            }

            if (data && data.value) {
                const sanitized = sanitizeSettings(data.value);
                setSettings(prev => ({ ...prev, ...sanitized }));
                // Atualiza local também para garantir sync rápido em refresh
                localStorage.setItem('iasd_settings', JSON.stringify(sanitized));
            }
        } catch (error) {
            console.error('Erro fetchSettings:', error);
        }
    }

    // Função para atualizar as configurações no banco
    const updateSettings = async (newSettings) => {
        // Atualiza estado local imediatamente para feedback rápido
        setSettings(newSettings);
        localStorage.setItem('iasd_settings', JSON.stringify(newSettings));

        if (!isAdmin) return; // Só admin salva no banco

        try {
            const { error } = await supabase
                .from('app_settings')
                .upsert({
                    key: 'general',
                    value: newSettings,
                    updated_at: new Date()
                }, { onConflict: 'key' });

            if (error) throw error;
        } catch (error) {
            toast.error('Erro ao salvar configurações no servidor: ' + error.message);
        }
    };

    // Carregar configurações do banco ao iniciar
    useEffect(() => {
        fetchSettings();
    }, []);

    // Login agora usa Supabase Auth (Email + Senha)
    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            toast.error('Erro no login: ' + error.message);
            return false;
        }
        return true;
    };

    const logout = async () => {
        setIsAdmin(false);
        await supabase.auth.signOut();
    };

    return (
        <FinancialContext.Provider value={{
            transactions,
            addTransaction,
            removeTransaction,
            updateTransaction,
            settings,
            setSettings: updateSettings, // Expor a nova função que salva no banco
            isAdmin,
            login,
            logout,
            selectedMonth,
            setSelectedMonth,
            isLoading,
            fetchTransactions,
            monthlyStats,
            updateMonthlyStats
        }}>
            {children}
        </FinancialContext.Provider>
    );
}

export const useFinancial = () => useContext(FinancialContext);
