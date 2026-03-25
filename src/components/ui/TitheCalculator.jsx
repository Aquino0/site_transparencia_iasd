import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TitheCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [income, setIncome] = useState('');
    const [offeringPercent, setOfferingPercent] = useState(5);

    const incomeValue = parseFloat(income) || 0;
    const tithe = incomeValue * 0.10;
    const offering = incomeValue * (offeringPercent / 100);
    const total = tithe + offering;

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-[60] bg-[#00AFB9] hover:bg-[#0081A7] text-white p-4 rounded-full shadow-lg shadow-[#0081A7]/40 flex items-center justify-center transition-colors"
                title="Calculadora de Dízimos e Ofertas"
            >
                <Calculator size={24} />
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        {/* Fundo escuro */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        
                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-gray-100 dark:border-gray-700"
                        >
                            <div className="bg-gradient-to-r from-[#0081A7] to-[#00AFB9] p-6 text-white flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Calculator size={20} />
                                        Calculadora
                                    </h3>
                                    <p className="text-[#FED9B7] text-sm mt-1">Dízimos e Ofertas</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Sua Renda / Entrada (R$)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-medium sm:text-sm">R$</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={income}
                                            onChange={(e) => setIncome(e.target.value)}
                                            placeholder="0.00"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#00AFB9] focus:border-[#00AFB9] dark:bg-gray-700 dark:text-white transition-all text-lg font-semibold"
                                        />
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">Dízimo (10%)</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tithe)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Porcentagem da Oferta (%)
                                        </label>
                                        <span className="text-sm font-bold text-[#F07167] bg-[#F07167]/10 px-2 py-0.5 rounded-md">
                                            {offeringPercent}%
                                        </span>
                                    </div>
                                    <input 
                                        type="range"
                                        min="0"
                                        max="30"
                                        step="1"
                                        value={offeringPercent}
                                        onChange={(e) => setOfferingPercent(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-[#F07167]"
                                    />
                                    
                                    <div className="flex justify-between items-center mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600 transition-colors">
                                        <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">Oferta Voluntária</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(offering)}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
                                    <div className="bg-[#FED9B7]/20 dark:bg-[#0081A7]/30 p-4 rounded-xl border border-[#FED9B7]/50 dark:border-[#0081A7]/50">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#0081A7] dark:text-[#FED9B7] font-bold text-sm uppercase tracking-wider">Total a Contribuir</span>
                                            <span className="text-2xl font-black text-[#F07167]">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
