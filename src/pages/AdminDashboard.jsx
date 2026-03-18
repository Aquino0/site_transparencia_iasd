import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';
import { MonthSelector } from '../components/ui/MonthSelector';
import { AdminTransactionList } from '../components/admin/AdminTransactionList';
import { TransactionForm } from '../components/admin/TransactionForm';
import { SettingsForm } from '../components/admin/SettingsForm';
import { PlusCircle, LogOut, ArrowLeft, Settings, Users, Save, Eye, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
    const { isAdmin, logout, transactions, selectedMonth, addTransaction, updateTransaction, removeTransaction, monthlyStats, updateMonthlyStats } = useFinancial();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Estado local para o formulário de estatísticas
    const [statsForm, setStatsForm] = useState({
        regular_members: 0,
        tithers_count: 0,
        offerers_count: 0,
        non_contributors_count: 0
    });

    // Atualiza o form quando mudar o stats do contexto
    useEffect(() => {
        if (monthlyStats) {
            setStatsForm(monthlyStats);
        } else {
            setStatsForm({
                regular_members: 0,
                tithers_count: 0,
                offerers_count: 0,
                non_contributors_count: 0
            });
        }
    }, [monthlyStats]);

    const handleSaveStats = async () => {
        const success = await updateMonthlyStats(statsForm);
        if (success) alert('Estatísticas salvas com sucesso!');
    };

    // --- LOGICA DE ACESSOS ---
    const [visits, setVisits] = useState([]);
    const [loadingVisits, setLoadingVisits] = useState(true);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_visits')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (!error) setVisits(data || []);
            } catch (err) {
                console.error('Erro ao buscar visitas:', err);
            } finally {
                setLoadingVisits(false);
            }
        };
        fetchVisits();
    }, []);

    const totalVisitsCount = visits.length;
    const today = new Date().toISOString().split('T')[0];
    const visitsToday = visits.filter(v => v.created_at && v.created_at.startsWith(today)).length;

    const cityCounts = visits.reduce((acc, visit) => {
        const city = visit.city || 'Desconhecida';
        const country = visit.country || '';
        const key = country ? `${city} (${country})` : city;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    const topCities = Object.entries(cityCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    // -------------------------

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    // Filtra transações do mês selecionado
    const currentTransactions = transactions
        .filter(t => t.date.startsWith(selectedMonth))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Menor data para maior

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
            removeTransaction(id);
        }
    };

    const handleFormSubmit = (data) => {
        if (editingItem) {
            updateTransaction(editingItem.id, data);
        } else {
            addTransaction(data);
        }
        setShowForm(false);
        setEditingItem(null);
    };

    if (!isAdmin) return null;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Painel do Tesoureiro</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Gerencie os lançamentos e informações do portal</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 flex items-center gap-1 font-medium px-3 py-2 transition-colors">
                        <ArrowLeft size={18} /> Ver Portal
                    </Link>
                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-lg transition font-medium"
                    >
                        <LogOut size={18} /> Sair
                    </button>
                </div>
            </div>

            <MonthSelector />

            {/* Formulário de Estatísticas */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 mb-8 transition-colors duration-300">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Users size={20} className="text-blue-600 dark:text-blue-400" /> Estatísticas de Fidelidade
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Membros (Base)</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={statsForm.regular_members}
                            onChange={e => setStatsForm({ ...statsForm, regular_members: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dizimistas</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={statsForm.tithers_count}
                            onChange={e => setStatsForm({ ...statsForm, tithers_count: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ofertantes</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={statsForm.offerers_count}
                            onChange={e => setStatsForm({ ...statsForm, offerers_count: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Não Contribuíram</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={statsForm.non_contributors_count}
                            onChange={e => setStatsForm({ ...statsForm, non_contributors_count: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSaveStats}
                        className="bg-blue-600 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 flex items-center gap-2 transition-colors"
                    >
                        <Save size={18} /> Salvar Estatísticas
                    </button>
                </div>
            </div>

            {/* Visualizador de Acessos */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 mb-8 transition-colors duration-300">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Eye size={20} className="text-purple-600 dark:text-purple-400" /> Acessos ao Site
                </h3>

                {loadingVisits ? (
                    <p className="text-gray-500 text-sm">Carregando dados de acesso...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Resumo */}
                        <div className="md:col-span-1 space-y-4">
                            <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                                <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Total de Visitas</span>
                                <p className="text-3xl font-black text-purple-900 dark:text-white mt-1">{totalVisitsCount}</p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">Visitas Hoje</span>
                                <p className="text-3xl font-black text-emerald-900 dark:text-white mt-1">{visitsToday}</p>
                            </div>
                        </div>

                        {/* Top Cidades */}
                        <div className="md:col-span-1">
                            <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1 border-b pb-1">
                                <Globe size={16} /> Principais Cidades
                            </h4>
                            <div className="space-y-1.5">
                                {topCities.length > 0 ? topCities.map(([city, count], idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded transition-colors">
                                        <span className="text-gray-600 dark:text-gray-400 truncate max-w-[160px]">{city}</span>
                                        <span className="font-bold text-slate-700 dark:text-slate-200 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">{count}</span>
                                    </div>
                                )) : (
                                    <p className="text-gray-400 text-xs">Nenhuma visita registrada.</p>
                                )}
                            </div>
                        </div>

                        {/* Últimos Acessos */}
                        <div className="md:col-span-1">
                            <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3 border-b pb-1">Últimos Acessos</h4>
                            <div className="space-y-1 overflow-y-auto max-h-[160px] pr-2">
                                {visits.slice(0, 5).map((v, idx) => (
                                    <div key={v.id || idx} className="text-xs p-1.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0 flex justify-between">
                                        <span className="truncate max-w-[120px] text-gray-600 dark:text-gray-400" title={v.city}>{v.city || 'Desconhecida'}</span>
                                        <span className="text-gray-400 text-[10px] flex items-center">
                                            {v.created_at ? new Date(v.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                                        </span>
                                    </div>
                                ))}
                                {visits.length === 0 && <p className="text-gray-400 text-xs">Sem acessos recentes.</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Lançamentos de {selectedMonth.split('-')[1]}/{selectedMonth.split('-')[0]}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => { setShowSettings(true); }}
                        className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2.5 rounded-lg shadow-sm transition font-medium"
                    >
                        <Settings size={20} /> Configurações
                    </button>
                    <button
                        onClick={() => { setEditingItem(null); setShowForm(true); }}
                        className="flex items-center gap-2 bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg shadow hover:shadow-lg transition font-medium"
                    >
                        <PlusCircle size={20} /> Novo Lançamento
                    </button>
                </div>
            </div>

            <AdminTransactionList
                transactions={currentTransactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {
                showForm && (
                    <TransactionForm
                        onSubmit={handleFormSubmit}
                        initialData={editingItem}
                        onCancel={() => { setShowForm(false); setEditingItem(null); }}
                    />
                )
            }

            {
                showSettings && (
                    <SettingsForm
                        onCancel={() => setShowSettings(false)}
                    />
                )
            }
        </div >
    );
}
