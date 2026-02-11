import React, { useMemo } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { MonthSelector } from '../components/ui/MonthSelector';
import { SummaryCards } from '../components/ui/SummaryCards';
import { TransactionTable } from '../components/ui/TransactionTable';
import { ChartsSection } from '../components/charts/ChartsSection';
import { ContributionTable } from '../components/ui/ContributionTable';
import { BookOpen, Printer } from 'lucide-react';

export function PublicDashboard() {
    const { settings, transactions, selectedMonth, monthlyStats, setSelectedMonth, isAdmin } = useFinancial();

    // Redirecionar se o mês atual não for permitido
    React.useEffect(() => {
        // Nota: Removemos o check de isAdmin para que o Dashboard Público sempre se comporte como tal,
        // mesmo se um admin estiver visualizando.
        if (!settings.visibleMonths || settings.visibleMonths.length === 0) return; // Sem restrições

        if (!settings.visibleMonths.includes(selectedMonth)) {
            // Tenta achar o mês visível mais próximo
            const sortedMonths = [...settings.visibleMonths].sort().reverse(); // Decrescente
            if (sortedMonths.length > 0) {
                setSelectedMonth(sortedMonths[0]);
            }
        }
    }, [selectedMonth, settings.visibleMonths, setSelectedMonth]);

    // Filtros e Cálculos Otimizados
    const { currentTransactions, previousBalance, totalIncome, totalExpense, lastMonthIncome, lastMonthExpense } = useMemo(() => {
        // Garantir que temos transactions como array
        const allTransactions = Array.isArray(transactions) ? transactions : [];

        // 1. Transações do mês selecionado
        const current = allTransactions.filter(t => t.date && t.date.startsWith(selectedMonth));

        // 2. Transações anteriores ao mês selecionado (para saldo anterior)
        const previous = allTransactions.filter(t => t.date && t.date < selectedMonth + '-01');

        const prevIncome = previous.filter(t => t.type === 'income').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const prevExpense = previous.filter(t => t.type === 'expense').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const prevBalance = prevIncome - prevExpense;

        // 3. Totais do mês atual
        const inc = current.filter(t => t.type === 'income').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const exp = current.filter(t => t.type === 'expense').reduce((acc, t) => acc + (Number(t.value) || 0), 0);

        // 4. Lógica de Tendência (Mês Anterior)
        const [year, month] = selectedMonth.split('-').map(Number);

        let lastMonthDate;
        if (month === 1) {
            lastMonthDate = new Date(year - 1, 11); // Dez -> 11 (pois Jan é 0)
        } else {
            lastMonthDate = new Date(year, month - 2);
        }

        const lastMonthStr = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

        const lastMonthTransactions = allTransactions.filter(t => t.date && t.date.startsWith(lastMonthStr));
        const lastMonthIncome = lastMonthTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + (Number(t.value) || 0), 0);
        const lastMonthExpense = lastMonthTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + (Number(t.value) || 0), 0);

        return {
            currentTransactions: current,
            previousBalance: prevBalance,
            totalIncome: inc,
            totalExpense: exp,
            lastMonthIncome,
            lastMonthExpense
        };
    }, [transactions, selectedMonth]);

    const incomeTransactions = currentTransactions.filter(t => t.type === 'income');
    const expenseTransactions = currentTransactions.filter(t => t.type === 'expense');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div
                className="relative rounded-2xl overflow-hidden mb-10 text-center py-16 px-6 bg-cover bg-center"
                style={{ backgroundImage: "url('/header-bg.png')" }}
            >
                {/* Overlay Escuro para Legibilidade */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 text-white">
                    <h2 className="text-4xl font-bold mb-4">Prestação de Contas</h2>
                    <p className="text-gray-100 text-lg max-w-2xl mx-auto mb-6">
                        {settings.welcomeText}
                    </p>

                    {settings.bibleVerse && (
                        <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-xl italic">
                            <div className="flex items-center justify-center gap-2 mb-2 not-italic font-bold text-xs uppercase tracking-wider text-blue-200">
                                <div className="bg-blue-500/20 p-1 rounded-full"><BookOpen size={14} /></div> Versículo do Mês
                            </div>
                            "{settings.bibleVerse.text}"
                            <span className="block text-sm font-semibold mt-2 not-italic text-blue-200">- {settings.bibleVerse.reference}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end mb-4 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="text-blue-900 font-semibold hover:underline text-sm flex items-center gap-1 bg-white px-3 py-1 rounded border border-blue-100 shadow-sm"
                >
                    <Printer size={16} /> Exportar Relatório
                </button>
            </div>

            <MonthSelector restrictView={true} />

            <div className="mb-8 mt-4">
                <ContributionTable stats={monthlyStats} />
            </div>

            <SummaryCards
                income={totalIncome}
                expense={totalExpense}
                previousBalance={previousBalance}
                lastMonthIncome={lastMonthIncome}
                lastMonthExpense={lastMonthExpense}
            />

            <ChartsSection transactions={currentTransactions} />



            <div className="grid lg:grid-cols-2 gap-8">
                <TransactionTable
                    title="Entradas do Mês"
                    transactions={incomeTransactions}
                    type="income"
                />
                <TransactionTable
                    title="Saídas do Mês"
                    transactions={expenseTransactions}
                    type="expense"
                />
            </div>

            {/* Área de Observações do Tesoureiro */}
            <div className="mt-12 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-300">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Nota da Tesouraria</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Os valores apresentados referem-se aos lançamentos efetivados no sistema até a presente data.
                    Dúvidas podem ser tratadas diretamente com a tesouraria após os cultos.
                </p>
            </div>
        </div>
    );
}
