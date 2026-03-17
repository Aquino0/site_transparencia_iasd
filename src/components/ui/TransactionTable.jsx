import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

function MobileCard({ transaction, isIncome, index }) {
    const date = new Date(transaction.date + 'T12:00:00');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className={cn("p-4 rounded-xl border shadow-sm flex items-center justify-between transition-all duration-300",
            isIncome 
                ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-100/40 dark:border-emerald-800/10" 
                : "bg-rose-50/60 dark:bg-rose-950/20 border-rose-100/40 dark:border-rose-800/10"
        )}>
            <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    isIncome ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                )}>
                    {isIncome ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 break-words">{transaction.description}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span className="text-gray-500 dark:text-gray-400 font-medium text-[11px]">
                            {transaction.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Calendar size={11} className="text-gray-400" />
                            {date.toLocaleDateString('pt-BR', { day: '2-digit' })}
                        </span>
                    </div>
                </div>
            </div>
            <div className={cn("font-bold whitespace-nowrap font-mono tracking-tight",
                isIncome ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
            )}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.value)}
            </div>
        </motion.div>
    );
}

export function TransactionTable({ transactions, title, type }) {
    const isIncome = type === 'income';

    return (
        <div className="h-full flex flex-col">
            {/* Título da Seção (Visível em ambos) */}
            <div className={cn("px-6 py-4 rounded-t-xl border-x border-t font-semibold text-lg flex items-center gap-2 md:rounded-xl md:shadow-sm md:border-b-0 md:mb-0 mb-2 rounded-xl shadow-sm md:shadow-none transition-all duration-300",
                isIncome 
                    ? "text-green-700 dark:text-green-400 bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-100/40 dark:border-emerald-800/10" 
                    : "text-red-700 dark:text-red-400 bg-rose-50/90 dark:bg-rose-950/40 border-rose-100/40 dark:border-rose-800/10"
            )}>
                {isIncome ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                {title}
            </div>

            {/* Versão Mobile: Lista de Cards */}
            <div className="md:hidden flex flex-col gap-3">
                {transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 dark:text-gray-500 italic bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 transition-colors duration-300">
                        Nenhum lançamento.
                    </div>
                ) : (
                    transactions.map((t, index) => (
                        <MobileCard key={t.id} transaction={t} isIncome={isIncome} index={index} />
                    ))
                )}
            </div>

            {/* Versão Desktop: Tabela */}
            <div className={cn("hidden md:block rounded-b-xl shadow-sm border border-t-0 overflow-hidden flex-1 transition-all duration-300",
                isIncome 
                    ? "bg-emerald-50/30 dark:bg-emerald-950/5 border-emerald-100/30 dark:border-emerald-800/10" 
                    : "bg-rose-50/30 dark:bg-rose-950/5 border-rose-100/30 dark:border-rose-800/10"
            )}>
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-medium">
                            <tr>
                                <th className="px-6 py-3">Dia</th>
                                <th className="px-6 py-3">Descrição</th>
                                <th className="px-6 py-3">Categoria</th>
                                <th className="px-6 py-3 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400 dark:text-gray-500 italic">
                                        Nenhum lançamento neste período.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((t, i) => (
                                    <motion.tr 
                                        key={t.id} 
                                        initial={{ opacity: 0, y: 15 }} 
                                        whileInView={{ opacity: 1, y: 0 }} 
                                        viewport={{ once: true, margin: "-10px" }} 
                                        transition={{ duration: 0.3, delay: i * 0.02 }} 
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors" 
                                    >
                                        <td className="px-6 py-3 text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(t.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 font-medium text-gray-800 dark:text-gray-200">{t.description}</td>
                                        <td className="px-6 py-3">
                                            <span className="inline-flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className={cn("px-6 py-3 text-right font-bold font-mono tracking-tight",
                                            isIncome ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                        )}>
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
