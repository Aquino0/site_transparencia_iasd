import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export function MonthSelector() {
    const { selectedMonth, setSelectedMonth } = useFinancial();

    const handlePrevMonth = () => {
        const [year, month] = selectedMonth.split('-').map(Number);
        const date = new Date(year, month - 1 - 1); // JS Month is 0-indexed
        setSelectedMonth(date.toISOString().slice(0, 7));
    };

    const handleNextMonth = () => {
        const [year, month] = selectedMonth.split('-').map(Number);
        const date = new Date(year, month - 1 + 1);
        setSelectedMonth(date.toISOString().slice(0, 7));
    };

    const formattedMonth = new Date(selectedMonth + '-02').toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
            <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-blue-900 transition"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 capitalize min-w-[200px] justify-center">
                <Calendar size={20} className="text-blue-900" />
                {formattedMonth}
            </div>

            <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-blue-900 transition"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
