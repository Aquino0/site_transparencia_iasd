import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export function MonthSelector({ restrictView = false }) {
    const { selectedMonth, setSelectedMonth, settings, isAdmin } = useFinancial();

    // Helper para verificar visibilidade
    const isMonthVisible = (monthStr) => {
        // Se for admin E NÃO estivermos forçando a visão restrita, vê tudo
        if (isAdmin && !restrictView) return true;

        // Se não houver lista de restrição (array vazio), vê tudo
        if (!settings.visibleMonths || settings.visibleMonths.length === 0) return true;

        return settings.visibleMonths.includes(monthStr);
    };

    // Helper para encontrar próximo mês visível
    const findAdjacentVisibleMonth = (direction) => {
        let [year, month] = selectedMonth.split('-').map(Number);
        let date = new Date(year, month - 1);

        // Tenta encontrar nos próximos/anteriores 24 meses (limite de segurança)
        for (let i = 0; i < 24; i++) {
            date.setMonth(date.getMonth() + direction);
            const monthStr = date.toISOString().slice(0, 7);

            if (isMonthVisible(monthStr)) {
                return monthStr;
            }
        }
        return null; // Não encontrou
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
    });

    // Verificar se botões devem estar desabilitados (sem próximo mês visível)
    // Otimização simples: checa se encontraria um mês
    // Nota: Em produção, poderíamos pré-calcular limites.

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
