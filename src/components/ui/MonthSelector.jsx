import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export function MonthSelector({ restrictView = false }) {
    const { selectedMonth, setSelectedMonth, settings, isAdmin } = useFinancial();

    // Helper para verificar visibilidade
    const isMonthVisible = (monthStr) => {
        if (isAdmin && !restrictView) return true;
        if (!settings.visibleMonths || settings.visibleMonths.length === 0) return true;
        return settings.visibleMonths.includes(monthStr);
    };

    // Helper para encontrar próximo mês visível
    const findAdjacentVisibleMonth = (direction) => {
        let [year, month] = selectedMonth.split('-').map(Number);
        let date = new Date(year, month - 1);

        for (let i = 0; i < 24; i++) {
            date.setMonth(date.getMonth() + direction);
            const monthStr = date.toISOString().slice(0, 7);

            if (isMonthVisible(monthStr)) {
                return monthStr;
            }
        }
        return null;
    };

    const handlePrevMonth = () => {
        const target = findAdjacentVisibleMonth(-1);
        if (target) setSelectedMonth(target);
    };

    const handleNextMonth = () => {
        const target = findAdjacentVisibleMonth(1);
        if (target) setSelectedMonth(target);
    };

    const formattedMonth = new Date(selectedMonth + '-02').toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
    }).replace(' de ', ' ');

    return (
        <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-[#FDF6E3] to-[#E5F6F0] dark:from-gray-800 dark:to-gray-800 p-3 px-6 rounded-2xl shadow-sm border border-orange-100/40 dark:border-gray-700 mb-8 transition-all duration-300 max-w-sm mx-auto">
            <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-blue-400 transition"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white capitalize min-w-[200px] justify-center">
                <Calendar size={20} className="text-blue-900 dark:text-blue-400" />
                {formattedMonth}
            </div>

            <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-blue-400 transition"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
