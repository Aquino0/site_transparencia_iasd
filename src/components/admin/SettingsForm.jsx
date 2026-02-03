import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export function SettingsForm({ onCancel }) {
    const { settings, setSettings } = useFinancial();
    const [formData, setFormData] = useState({
        churchName: settings.churchName,
        welcomeText: settings.welcomeText,
        bibleVerseText: settings.bibleVerse?.text || '',
        bibleVerseRef: settings.bibleVerse?.reference || ''
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
            }
        });
        onCancel();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Editar Configurações</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Igreja</label>
                        <input
                            type="text"
                            required
                            value={formData.churchName}
                            onChange={e => setFormData({ ...formData, churchName: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Boas-vindas</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.welcomeText}
                            onChange={e => setFormData({ ...formData, welcomeText: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-2">
                        <h4 className="font-semibold text-gray-800 mb-3 text-sm">Versículo do Mês</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Texto Bíblico</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.bibleVerseText}
                                    onChange={e => setFormData({ ...formData, bibleVerseText: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: O Senhor é o meu pastor..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Referência</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.bibleVerseRef}
                                    onChange={e => setFormData({ ...formData, bibleVerseRef: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: Salmos 23:1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 bg-blue-900 rounded text-white hover:bg-blue-800 font-medium"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
