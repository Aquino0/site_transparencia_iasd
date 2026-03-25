import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

const CATEGORIES = [
    'Ofertas',
    'Ação Solidária Adventista (ASA)',
    'Clube dos Aventureiros',
    'Clube dos Desbravadores',
    'Comunicação',
    'Construção',
    'Escola Sabatina',
    'Ministério da Criança',
    'Ministério da Família',
    'Ministério da Mulher',
    'Ministério da Música',
    'Ministério da Saúde',
    'Ministério Pessoal',
    'Sociedade dos Jovens Adventistas',
    'Sonoplastia',
    'Tesouraria'
];

export function TransactionForm({ onSubmit, initialData, onCancel }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            type: 'expense',
            date: new Date().toISOString().slice(0, 10),
            description: '',
            value: '',
            category: CATEGORIES[0]
        }
    });

    useEffect(() => {
        if (initialData) reset(initialData);
    }, [initialData, reset]);

    const submitForm = (data) => {
        onSubmit({ ...data, value: parseFloat(data.value) });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {initialData ? 'Editar Lançamento' : 'Novo Lançamento'}
                    </h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
                            <select
                                {...register('type')}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="income">Entrada</option>
                                <option value="expense">Saída</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
                            <input
                                type="date"
                                required
                                {...register('date')}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: Conta de Luz"
                            {...register('description')}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor (R$)</label>
                            <input
                                type="number"
                                required
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                {...register('value', { required: true, min: 0 })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                            <select
                                {...register('category')}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 bg-blue-900 dark:bg-blue-600 rounded text-white hover:bg-blue-800 dark:hover:bg-blue-500 font-medium transition-colors"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
