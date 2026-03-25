import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Users, Save } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import toast from 'react-hot-toast';

export function StatsForm() {
    const { monthlyStats, updateMonthlyStats } = useFinancial();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            regular_members: 0,
            tithers_count: 0,
            offerers_count: 0,
            non_contributors_count: 0
        }
    });

    useEffect(() => {
        if (monthlyStats) {
            reset(monthlyStats);
        } else {
            reset({
                regular_members: 0,
                tithers_count: 0,
                offerers_count: 0,
                non_contributors_count: 0
            });
        }
    }, [monthlyStats, reset]);

    const handleSaveStats = async (data) => {
        const success = await updateMonthlyStats(data);
        if (success) toast.success('Estatísticas salvas com sucesso!');
    };

    return (
        <form onSubmit={handleSubmit(handleSaveStats)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 mb-8 transition-colors duration-300">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-600 dark:text-blue-400" /> Estatísticas de Fidelidade
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Membros (Base)</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        {...register('regular_members', { valueAsNumber: true })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dizimistas</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        {...register('tithers_count', { valueAsNumber: true })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ofertantes</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        {...register('offerers_count', { valueAsNumber: true })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Não Contribuíram</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        {...register('non_contributors_count', { valueAsNumber: true })}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Save size={18} /> Salvar Estatísticas
                </button>
            </div>
        </form>
    );
}
