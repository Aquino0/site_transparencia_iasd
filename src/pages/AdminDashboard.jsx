import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';
import { MonthSelector } from '../components/ui/MonthSelector';
import { AdminTransactionList } from '../components/admin/AdminTransactionList';
import { TransactionForm } from '../components/admin/TransactionForm';
import { SettingsForm } from '../components/admin/SettingsForm';
import { PlusCircle, LogOut, ArrowLeft, Settings, Users, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

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
