import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinancial } from '../context/FinancialContext';
import { MonthSelector } from '../components/ui/MonthSelector';
import { AdminTransactionList } from '../components/admin/AdminTransactionList';
import { TransactionForm } from '../components/admin/TransactionForm';
import { SettingsForm } from '../components/admin/SettingsForm';
import { PlusCircle, LogOut, ArrowLeft, Settings, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { StatsForm } from '../components/admin/StatsForm';
import { SiteVisitsMonitor } from '../components/admin/SiteVisitsMonitor';
import toast from 'react-hot-toast';

export function AdminDashboard() {
    const { isAdmin, logout, transactions, selectedMonth, addTransaction, updateTransaction, removeTransaction, monthlyStats, updateMonthlyStats } = useFinancial();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

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
        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="font-semibold text-gray-800 dark:text-white text-sm">Excluir este lançamento?</p>
                <p className="text-gray-500 text-xs">Esta ação não pode ser desfeita.</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1.5 text-xs rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => { removeTransaction(id); toast.dismiss(t.id); }}
                        className="px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors font-medium flex items-center gap-1"
                    >
                        <Trash2 size={12} /> Excluir
                    </button>
                </div>
            </div>
        ), { duration: Infinity, style: { padding: '16px', minWidth: '260px' } });
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

            <StatsForm />
            
            <SiteVisitsMonitor />

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
