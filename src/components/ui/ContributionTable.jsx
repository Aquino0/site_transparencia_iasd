import React from 'react';
import { Users, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContributionTable({ stats }) {
    if (!stats || stats.regular_members === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center text-gray-500"
            >
                <Users className="mx-auto mb-2 text-gray-300" size={32} />
                <p>Nenhum dado estatístico lançado para este mês.</p>
            </motion.div>
        );
    }

    const { regular_members, tithers_count, offerers_count, non_contributors_count } = stats;

    const calcPercent = (val) => ((val / regular_members) * 100).toFixed(1) + '%';

    const rows = [
        { label: 'Dizimistas', count: tithers_count, color: 'bg-green-500', icon: '🙏' },
        { label: 'Ofertantes', count: offerers_count, color: 'bg-blue-500', icon: '❤️' },
        { label: 'Não contribuíram', count: non_contributors_count, color: 'bg-gray-300', icon: '❌' }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 overflow-hidden transition-colors duration-300"
        >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-gray-700/30">
                <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-gray-100">
                    <PieChart size={20} className="text-blue-600 dark:text-blue-400" />
                    Estatísticas de Fidelidade
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-gray-300 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-slate-200 dark:border-gray-600 self-start sm:self-auto">
                    Base: <strong className="text-slate-900 dark:text-white">{regular_members}</strong> membros frequentes
                </div>
            </div>

            {/* Mobile View */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="block md:hidden p-4 space-y-4"
            >
                {rows.map((row) => (
                    <motion.div variants={item} key={row.label} className="bg-slate-50 dark:bg-gray-700/30 rounded-lg p-3 border border-slate-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                <span className="text-lg">{row.icon}</span> {row.label}
                            </span>
                            <div className="text-right">
                                <div className="font-bold text-gray-900 dark:text-white">{row.count}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{calcPercent(row.count)}</div>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: calcPercent(row.count) }}
                                transition={{ duration: 0.5 }}
                                className={`h-1.5 rounded-full ${row.color}`}
                            ></motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-700/30">
                        <tr>
                            <th className="px-6 py-3 font-medium">Tipo de Contribuição</th>
                            <th className="px-6 py-3 font-medium text-center">Quantidade</th>
                            <th className="px-6 py-3 font-medium text-right">Percentual</th>
                            <th className="px-6 py-3 w-32"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {rows.map((row) => (
                            <tr key={row.label} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                    <span className="text-base">{row.icon}</span> {row.label}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300 font-semibold">
                                    {row.count}
                                </td>
                                <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-300">
                                    {calcPercent(row.count)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: calcPercent(row.count) }}
                                            transition={{ duration: 0.5 }}
                                            className={`h-2 rounded-full ${row.color}`}
                                        ></motion.div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-slate-50 dark:bg-gray-700/50 font-bold text-gray-900 dark:text-white">
                            <td className="px-6 py-3">Total</td>
                            <td className="px-6 py-3 text-center">{regular_members}</td>
                            <td className="px-6 py-3 text-right">100%</td>
                            <td className="px-6 py-3"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
