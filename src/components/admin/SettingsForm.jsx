import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export function SettingsForm({ onCancel }) {
    const { settings, setSettings } = useFinancial();
    const [formData, setFormData] = useState({
        churchName: settings.churchName,
        welcomeText: settings.welcomeText,
        bibleVerseText: settings.bibleVerse?.text || '',
        bibleVerseRef: settings.bibleVerse?.reference || '',
        visibleMonths: settings.visibleMonths || []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSettings({
            ...settings,
            churchName: formData.churchName,
            welcomeText: formData.welcomeText,
            bibleVerse: {
                text: formData.bibleVerseText,
                reference: formData.bibleVerseRef
            },
            visibleMonths: formData.visibleMonths
        });
        onCancel();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Editar Configurações</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Igreja</label>
                        <input
                            type="text"
                            required
                            value={formData.churchName}
                            onChange={e => setFormData({ ...formData, churchName: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Texto de Boas-vindas</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.welcomeText}
                            onChange={e => setFormData({ ...formData, welcomeText: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-3 text-sm">Versículo do Mês</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Texto Bíblico</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.bibleVerseText}
                                    onChange={e => setFormData({ ...formData, bibleVerseText: e.target.value })}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Ex: O Senhor é o meu pastor..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Referência</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.bibleVerseRef}
                                    onChange={e => setFormData({ ...formData, bibleVerseRef: e.target.value })}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Ex: Salmos 23:1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-3 text-sm">Visibilidade Pública</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Selecione os meses que devem aparecer para o público. Se nenhum for selecionado, todos aparecerão.</p>
                        <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border rounded bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600">
                            {
                                // Gerar lista de meses (do ano passado até o próximo ano)
                                Array.from({ length: 36 }, (_, i) => {
                                    const d = new Date();
                                    d.setMonth(d.getMonth() - 12 + i);
                                    return d.toISOString().slice(0, 7);
                                }).map(monthStr => {
                                    const [y, m] = monthStr.split('-');
                                    const label = `${m}/${y}`;
                                    const isSelected = formData.visibleMonths?.includes(monthStr);

                                    return (
                                        <label key={monthStr} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white dark:hover:bg-gray-600 p-1 rounded text-gray-700 dark:text-gray-200">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    let newMonths = [...(formData.visibleMonths || [])];
                                                    if (e.target.checked) {
                                                        newMonths.push(monthStr);
                                                    } else {
                                                        newMonths = newMonths.filter(m => m !== monthStr);
                                                    }
                                                    setFormData({ ...formData, visibleMonths: newMonths });
                                                }}
                                                className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                                            />
                                            {label}
                                        </label>
                                    );
                                })
                            }
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
