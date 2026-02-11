import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFinancial } from '../../context/FinancialContext';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
    const { settings } = useFinancial();

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                    <img
                        src="/logo-iasd-oficial.png"
                        alt="Logo IASD Tesouraria"
                        className="h-12 md:h-16 w-auto object-contain"
                    />
                    <div>
                        <h1 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight">IASD Vila Pinheiro</h1>
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Portal da Transparência</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link
                        to="/admin"
                        className="text-gray-400 hover:text-blue-900 dark:text-gray-500 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Acesso Tesouraria"
                    >
                        <Lock size={18} />
                    </Link>
                </div>
            </div>
        </header>
    );
}

