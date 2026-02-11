import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

// New Brand Colors
const COLORS = ['#32586E', '#4A6F8A', '#6B8CA3', '#8FA8BD', '#B5C5D4', '#DAE2EA'];

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
            {/* Horizontal Bar Chart for Expenses Distribution */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 border-l-4 border-blue-900 dark:border-blue-500 pl-3">
                    Despesas por Departamento
                </h3>

                {expensesData.length > 0 ? (
                    <div className="w-full h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={expensesData}
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }} // Increased left margin for labels
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={gridColor} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={150}
                                    tick={{ fontSize: 13, fill: axisColor }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: isDark ? '#374151' : '#f3f4f6' }}
                                    contentStyle={tooltipStyle}
                                    formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                                />
                                <Bar
                                    dataKey="value"
                                    fill={barColor}
                                    radius={[0, 4, 4, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                        <p>Nenhuma despesa registrada.</p>
                    </div>
                )}
            </div>

            {/* Comparison Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 border-l-4 border-blue-900 dark:border-blue-500 pl-3">
                    Balanço do Mês
                </h3>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={summaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
