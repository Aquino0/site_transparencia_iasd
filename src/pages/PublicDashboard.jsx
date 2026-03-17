import React, { useMemo } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { MonthSelector } from '../components/ui/MonthSelector';
import { SummaryCards } from '../components/ui/SummaryCards';
import { TransactionTable } from '../components/ui/TransactionTable';
import { ChartsSection } from '../components/charts/ChartsSection';
import { ContributionTable } from '../components/ui/ContributionTable';
import { BookOpen, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

import { HeroSequence } from '../components/ui/HeroSequence';

export function PublicDashboard() {
    const { settings, transactions, selectedMonth, monthlyStats, setSelectedMonth, isAdmin } = useFinancial();
    
    // ... manter lógica inalterada ...
    React.useEffect(() => {
        if (!settings.visibleMonths || settings.visibleMonths.length === 0) return;
        if (!settings.visibleMonths.includes(selectedMonth)) {
            const sortedMonths = [...settings.visibleMonths].sort().reverse();
            if (sortedMonths.length > 0) {
                setSelectedMonth(sortedMonths[0]);
            }
        }
    }, [selectedMonth, settings.visibleMonths, setSelectedMonth]);

    const { currentTransactions, previousBalance, totalIncome, totalExpense, lastMonthIncome, lastMonthExpense } = useMemo(() => {
        const allTransactions = Array.isArray(transactions) ? transactions : [];
        const current = allTransactions.filter(t => t.date && t.date.startsWith(selectedMonth));
        const previous = allTransactions.filter(t => t.date && t.date < selectedMonth + '-01');
        const prevIncome = previous.filter(t => t.type === 'income').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const prevExpense = previous.filter(t => t.type === 'expense').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const prevBalance = prevIncome - prevExpense;
        const inc = current.filter(t => t.type === 'income').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const exp = current.filter(t => t.type === 'expense').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const [year, month] = selectedMonth.split('-').map(Number);
        let lastMonthDate = month === 1 ? new Date(year - 1, 11) : new Date(year, month - 2);
        const lastMonthStr = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;
        const lastMonthTransactions = allTransactions.filter(t => t.date && t.date.startsWith(lastMonthStr));
        const lastMonthIncome = lastMonthTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const lastMonthExpense = lastMonthTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        return { currentTransactions: current, previousBalance: prevBalance, totalIncome: inc, totalExpense: exp, lastMonthIncome, lastMonthExpense };
    }, [transactions, selectedMonth]);

    const incomeTransactions = currentTransactions.filter(t => t.type === 'income');
    const expenseTransactions = currentTransactions.filter(t => t.type === 'expense');

    return (
        <div className="relative overflow-hidden mx-auto py-8">
            {/* 🌌 Esferas de Luz no Fundo */}
            <div className="absolute top-[300px] left-[-150px] w-80 h-80 bg-teal-400/20 dark:bg-teal-500/10 rounded-full filter blur-[100px] opacity-25 animate-pulse -z-10"></div>
            <div className="absolute top-[600px] right-[-150px] w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full filter blur-[130px] opacity-25 animate-pulse delay-1000 -z-10"></div>

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
            >
                <HeroSequence videoUrl="/trigo.mp4" className="w-full mb-10 text-center py-16 px-6 relative overflow-hidden">
                    <div className="text-white z-10">
                        <motion.h2 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                            className="text-3xl md:text-5xl font-black mb-4 drop-shadow-xl tracking-tight bg-gradient-to-r from-white via-blue-50 to-blue-100 bg-clip-text"
                        >
                            Prestação de Contas
                        </motion.h2>
                        <p className="text-gray-100 text-lg max-w-2xl mx-auto mb-6 drop-shadow-md">
                            {settings.welcomeText}
                        </p>

                        {settings.bibleVerse && (
                             <motion.div 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.4 }}
                                 className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-xl italic shadow-md text-sm max-w-md mx-4"
                             >
                                "{settings.bibleVerse.text}"
                                <span className="block text-sm font-semibold mt-2 not-italic text-blue-200">- {settings.bibleVerse.reference}</span>
                            </motion.div>
                        )}
                    </div>
                </HeroSequence>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-end mb-4 print:hidden mt-4">
                    <button onClick={() => window.print()} className="text-blue-900 font-semibold hover:underline text-sm flex items-center gap-1 bg-white px-3 py-1 rounded border border-blue-100 shadow-sm">
                        <Printer size={16} /> Exportar Relatório
                    </button>
                </div>

                <MonthSelector restrictView={true} />

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                    className="mb-8 mt-4 bg-white/80 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl p-4 md:p-6 border border-white/40 dark:border-gray-700/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
                >
                    <ContributionTable stats={monthlyStats} />
                </motion.div>

                <SummaryCards income={totalIncome} expense={totalExpense} previousBalance={previousBalance} lastMonthIncome={lastMonthIncome} lastMonthExpense={lastMonthExpense} />

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                >
                    <ChartsSection transactions={currentTransactions} />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}>
                        <TransactionTable title="Entradas do Mês" transactions={incomeTransactions} type="income" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.3 }}>
                        <TransactionTable title="Saídas do Mês" transactions={expenseTransactions} type="expense" />
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-gradient-to-r from-[#FDF6E3]/50 to-[#E5F6F0]/50 dark:from-gray-800/85 dark:via-gray-800/75 dark:to-gray-800/70 text-gray-800 dark:text-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-2xl p-6 transition-all duration-300 hover:shadow-md border border-white/50 dark:border-gray-700/30 backdrop-blur-md"
                >
                    <h4 className="font-extrabold text-gray-900 dark:text-white mb-2">Nota da Tesouraria</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        Os valores apresentados referem-se aos lançamentos efetivados no sistema até a presente data. Dúvidas podem ser tratadas diretamente com a tesouraria após os cultos.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
