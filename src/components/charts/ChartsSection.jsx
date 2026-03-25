import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

// New Brand Colors
const COLORS = ['#2DD4BF', '#34D399', '#FB923C', '#F87171', '#818CF8', '#A78BFA', '#F472B6'];

export function ChartsSection({ transactions }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    // Process data for Expenses (Horizontal Bar Chart)
    const expensesByCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.value;
        return acc;
    }, {});

    const expensesData = Object.entries(expensesByCategory)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value); // Sort by highest expense

    // Process data for Summary (Simple Bar Chart)
    const totalIncome = income.reduce((acc, t) => acc + t.value, 0);
    const totalExpense = expenses.reduce((acc, t) => acc + t.value, 0);

    const summaryData = [
        { name: 'Entradas', value: totalIncome, fill: '#16a34a' }, // green-600
        { name: 'Saídas', value: totalExpense, fill: '#dc2626' }   // red-600
    ];

    // Chart styling constants
    const axisColor = isDark ? '#9ca3af' : '#4b5563';
    const gridColor = isDark ? '#374151' : '#f0f0f0';
    const tooltipStyle = {
        backgroundColor: isDark ? '#1f2937' : '#fff',
        borderColor: isDark ? '#374151' : '#fff',
        color: isDark ? '#f3f4f6' : '#111827',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    };
    const barColor = isDark ? '#60a5fa' : '#32586E';

    return (
        <div className="grid md:grid-cols-2 gap-6 mb-10 print:grid-cols-2">
            {/* Donut/Pie Chart for Expenses Distribution */}
            <div className="bg-gradient-to-r from-[#FDF6E3]/40 to-[#E5F6F0]/40 dark:from-gray-800/90 dark:to-gray-800/90 p-6 rounded-2xl shadow-sm border border-white/40 dark:border-gray-700/30 transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 border-l-4 border-blue-900 dark:border-blue-500 pl-3">
                    Despesas por Departamento
                </h3>

                {expensesData.length > 0 ? (() => {
                    const total = expensesData.reduce((s, d) => s + d.value, 0);
                    return (
                        <div className="w-full h-[350px] flex flex-col items-center">
                            <ResponsiveContainer width="100%" height="80%">
                                <PieChart>
                                    <Pie
                                        data={expensesData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={120}
                                        paddingAngle={2}
                                        dataKey="value"
                                        labelLine={false}
                                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                            if (percent < 0.04) return null; // Não mostra % em fatias muito pequenas
                                            const RADIAN = Math.PI / 180;
                                            const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                            return (
                                                <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13, fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                                                    {`${(percent * 100).toFixed(0)}%`}
                                                </text>
                                            );
                                        }}
                                    >
                                        {expensesData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                stroke="transparent"
                                            />
                                        ))}
                                    </Pie>
                                    {/* Label central */}
                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central">
                                        <tspan x="50%" dy="-0.4em" style={{ fontSize: 13, fontWeight: 700, fill: isDark ? '#f9fafb' : '#1f2937' }}>Despesas</tspan>
                                        <tspan x="50%" dy="1.4em" style={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }}>por depto.</tspan>
                                    </text>
                                    <Tooltip
                                        contentStyle={tooltipStyle}
                                        formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Legenda horizontal separada, estilo da imagem */}
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-1 px-2 w-full">
                                {expensesData.map((entry, index) => (
                                    <div key={entry.name} className="flex items-center gap-1.5">
                                        <span className="inline-block w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                        <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium truncate max-w-[100px]" title={entry.name}>{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })() : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                        <p>Nenhuma despesa registrada.</p>
                    </div>
                )}
            </div>

            {/* Comparison Chart */}
            <div className="bg-gradient-to-r from-[#FDF6E3]/40 to-[#E5F6F0]/40 dark:from-gray-800/90 dark:to-gray-800/90 p-6 rounded-2xl shadow-sm border border-white/40 dark:border-gray-700/30 transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 border-l-4 border-blue-900 dark:border-blue-500 pl-3">
                    Balanço do Mês
                </h3>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={summaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.85}/>
                                    <stop offset="100%" stopColor="#047857" stopOpacity={0.85}/>
                                </linearGradient>
                                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.85}/>
                                    <stop offset="100%" stopColor="#B91C1C" stopOpacity={0.85}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 14, fontWeight: 500, fill: axisColor }}
                            />
                            <YAxis
                                tickFormatter={(value) => `R$${value / 1000}k`}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: axisColor }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={tooltipStyle}
                                formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                            />
                            <Bar
                                dataKey="value"
                                radius={[6, 6, 0, 0]}
                                barSize={60}
                            >
                                {summaryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.name === 'Entradas' ? 'url(#incomeGrad)' : 'url(#expenseGrad)'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
