import { useMemo } from 'react';

export function useDashboardStats(transactions, selectedMonth) {
    return useMemo(() => {
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
        
        const incomeTransactions = current.filter(t => t.type === 'income');
        const expenseTransactions = current.filter(t => t.type === 'expense');

        return { 
            currentTransactions: current, 
            previousBalance: prevBalance, 
            totalIncome: inc, 
            totalExpense: exp, 
            lastMonthIncome, 
            lastMonthExpense,
            incomeTransactions,
            expenseTransactions
        };
    }, [transactions, selectedMonth]);
}
