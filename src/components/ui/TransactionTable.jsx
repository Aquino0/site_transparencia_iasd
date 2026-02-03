import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

function MobileCard({ transaction, isIncome }) {
    const date = new Date(transaction.date + 'T12:00:00');

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    isIncome ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                    {isIncome ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 line-clamp-1">{transaction.description}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                            {transaction.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                    </div>
                </div>
            </div>
            <div className={cn("font-bold whitespace-nowrap",
                isIncome ? "text-green-700" : "text-red-700"
            )}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.value)}
            </div>
        </div>
    );
}

export function TransactionTable({ transactions, title, type }) {
    const isIncome = type === 'income';

    return (
        <div className="h-full flex flex-col">
            {/* Título da Seção (Visível em ambos) */}
            <div className={cn("px-6 py-4 rounded-t-xl border-x border-t border-gray-100 font-semibold text-lg flex items-center gap-2 md:rounded-xl md:shadow-sm md:border-b-0 md:mb-0 mb-2 rounded-xl shadow-sm md:shadow-none bg-white",
                isIncome ? "text-green-700 bg-green-50/50" : "text-red-700 bg-red-50/50"
            )}>
                {isIncome ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                {title}
            </div>

            {/* Versão Mobile: Lista de Cards */}
            <div className="md:hidden flex flex-col gap-3">
                {transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 italic bg-white rounded-xl border border-gray-100 p-4">
                        Nenhum lançamento.
                    </div>
                ) : (
                    transactions.map((t) => (
                        <MobileCard key={t.id} transaction={t} isIncome={isIncome} />
                    ))
                )}
            </div>

            {/* Versão Desktop: Tabela */}
            <div className="hidden md:block bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-100 overflow-hidden flex-1">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Dia</th>
                                <th className="px-6 py-3">Descrição</th>
                                <th className="px-6 py-3">Categoria</th>
                                <th className="px-6 py-3 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400 italic">
                                        Nenhum lançamento neste período.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3 text-gray-600">
                                            {new Date(t.date + 'T12:00:00').getDate()}
                                        </td>
                                        <td className="px-6 py-3 font-medium text-gray-800">{t.description}</td>
                                        <td className="px-6 py-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className={cn("px-6 py-3 text-right font-semibold",
                                            isIncome ? "text-green-600" : "text-red-600"
                                        )}>
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
