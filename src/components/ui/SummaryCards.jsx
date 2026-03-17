import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

function TrendBadge({ current, previous, type }) {
    if (!previous || previous === 0) return null;

    const diff = current - previous;
    const percentage = ((diff / previous) * 100).toFixed(1);
    const isUp = diff > 0;
    const isZero = diff === 0;

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

function Card({ title, value, type, icon: Icon, previousValue, index }) {
    const isPositive = type === 'income' || (type === 'balance' && value >= 0);
    const colorClass =
        type === 'income' ? 'text-green-600 bg-green-50' :
            type === 'expense' ? 'text-red-600 bg-red-50' :
                type === 'neutral' ? 'text-gray-600 bg-gray-50' :
                    value >= 0 ? 'text-blue-600 bg-blue-50' : 'text-orange-600 bg-orange-50';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: index * 0.15 }}
            whileHover={{ y: -10, scale: 1.04, rotateZ: 0.5 }}
            className={cn("backdrop-blur-md rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl relative overflow-hidden cursor-pointer group", title === "Saldo Atual" ? "bg-gradient-to-br from-cyan-50/80 to-teal-50/70 dark:from-cyan-950/30 dark:to-teal-950/20 border-cyan-100/60 dark:border-cyan-800/20" : type === "income" ? "bg-gradient-to-br from-emerald-50/80 to-teal-50/70 dark:from-emerald-950/30 dark:to-teal-950/20 border-emerald-100/40 dark:border-emerald-800/20" : type === "expense" ? "bg-gradient-to-br from-rose-50/80 to-red-50/70 dark:from-rose-950/30 dark:to-red-950/20 border-rose-100/40 dark:border-rose-800/20" : "bg-gradient-to-br from-slate-50/80 to-gray-50/70 dark:from-gray-800/70 dark:to-gray-800/60 border-gray-100/40 dark:border-gray-700/30")}
        >
            {/* 💡 Hover Glow Effect light */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-transparent to-white/10 transition-opacity duration-300 -z-1"></div>

            <div className={cn("p-3.5 rounded-full mb-4 shadow-inner transition-transform duration-300 group-hover:scale-110", colorClass)}>
                <Icon size={26} />
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
            <h3 className={cn("text-2xl font-black mt-2 font-mono tracking-tight transition-all duration-300 group-hover:text-[1.6rem]",
                type === 'income' ? 'text-green-600 dark:text-green-400' :
                    type === 'expense' ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'
            )}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            </h3>

            {(type === 'income' || type === 'expense') && (
                <div className="mt-2">
                    <TrendBadge current={value} previous={previousValue} type={type} />
                </div>
            )}
        </motion.div>
    );
}

export function SummaryCards({ income, expense, previousBalance, lastMonthIncome, lastMonthExpense }) {
    const result = income - expense;
    const currentBalance = previousBalance + result;

    const cards = [
        { title: "Saldo Anterior", value: previousBalance, type: "neutral", icon: Wallet },
        { title: "Entradas do Mês", value: income, type: "income", icon: ArrowUpCircle, previousValue: lastMonthIncome },
        { title: "Saídas do Mês", value: expense, type: "expense", icon: ArrowDownCircle, previousValue: lastMonthExpense },
        { title: "Saldo Atual", value: currentBalance, type: "balance", icon: Wallet }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {cards.map((card, index) => (
                <Card key={card.title} {...card} index={index} />
            ))}
        </div>
    );
}
