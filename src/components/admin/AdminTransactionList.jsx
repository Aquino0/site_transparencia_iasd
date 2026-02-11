import React from 'react';
import { Edit2, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminTransactionList({ transactions, onEdit, onDelete }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4">Tipo</th>
                            <th className="px-6 py-4">Descrição</th>
                            <th className="px-6 py-4">Categoria</th>
                            <th className="px-6 py-4 text-right">Valor</th>
                            <th className="px-6 py-4 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    Nenhum lançamento encontrado para este período.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                        {new Date(t.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                                            t.type === 'income' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                        )}>
                                            {t.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                            {t.type === 'income' ? 'Entrada' : 'Saída'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">{t.description}</td>
                                    <td className="px-6 py-3 text-gray-600 dark:text-gray-300">{t.category}</td>
                                    <td className={cn("px-6 py-3 text-right font-bold whitespace-nowrap",
                                        t.type === 'income' ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    )}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onEdit(t)}
                                                className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition"
                                                title="Editar"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(t.id)}
                                                className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition"
                                                title="Excluir"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
