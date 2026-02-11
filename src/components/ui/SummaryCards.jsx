import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

function TrendBadge({ current, previous, type }) {
    if (!previous || previous === 0) return null;

    const diff = current - previous;
    const percentage = ((diff / previous) * 100).toFixed(1);
    const isUp = diff > 0;
    const isZero = diff === 0;

    // Lógica de cores:
    // Para ENTRADAS (income): Subir é BOM (Verde), Descer é RUIM (Vermelho)
    // Para SAÍDAS (expense): Subir é RUIM (Vermelho), Descer é BOM (Verde)
    let colorClass = 'text-gray-500 bg-gray-100';
    if (!isZero) {
        if (type === 'income') {
            colorClass = isUp ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100';
        } else if (type === 'expense') {
            colorClass = isUp ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100';
        }
    }

    return (
        <div className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-2", colorClass)}>
            {isZero ? <Minus size={12} /> : isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(percentage)}% vs mês ant.
        </div>
    );
}

function Card({ title, value, type, icon: Icon, previousValue }) {
    const isPositive = type === 'income' || (type === 'balance' && value >= 0);
    const colorClass =
        type === 'income' ? 'text-green-600 bg-green-50' :
            type === 'expense' ? 'text-red-600 bg-red-50' :
                type === 'neutral' ? 'text-gray-600 bg-gray-50' :
                    value >= 0 ? 'text-blue-600 bg-blue-50' : 'text-orange-600 bg-orange-50';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 p-6 flex flex-col items-center text-center transition-colors duration-300 hover:shadow-md relative overflow-hidden">
            <div className={cn("p-3 rounded-full mb-3", colorClass)}>
                <Icon size={28} />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
            <h3 className={cn("text-2xl font-bold mt-1",
                type === 'income' ? 'text-green-700 dark:text-green-400' :
                    type === 'expense' ? 'text-red-700 dark:text-red-400' : 'text-slate-800 dark:text-white'
            )}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            </h3>

            {(type === 'income' || type === 'expense') && (
                <div className="mt-2">
                    <TrendBadge current={value} previous={previousValue} type={type} />
                </div>
            )}
        </div>
    );
}

export function SummaryCards({ income, expense, previousBalance, lastMonthIncome, lastMonthExpense }) {
    const result = income - expense;
    const currentBalance = previousBalance + result;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card
                title="Saldo Anterior"
                value={previousBalance}
                type="neutral"
                icon={Wallet}
            />
            <Card
                title="Entradas"
                value={income}
                type="income"
                icon={ArrowUpCircle}
                previousValue={lastMonthIncome}
            />
            <Card
                title="Saídas"
                value={expense}
                type="expense"
                icon={ArrowDownCircle}
                previousValue={lastMonthExpense}
            />
            <Card
                title="Saldo Atual"
                value={currentBalance}
                type="balance"
                icon={Wallet}
            />
        </div>
    );
}
