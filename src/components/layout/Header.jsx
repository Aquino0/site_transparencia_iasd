import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFinancial } from '../../context/FinancialContext';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
    const { settings } = useFinancial();

    return (
        <header className="bg-gradient-to-r from-[#FDF6E3] to-[#E5F6F0] dark:from-gray-800 dark:to-gray-800 border-b border-orange-100/30 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-1.5 md:gap-2 hover:opacity-90 transition-opacity cursor-pointer min-w-0">
                    <img
                        src="/logo-iasd-oficial.png"
                        alt="Logo IASD Tesouraria"
                        className="h-10 md:h-16 w-auto object-contain flex-shrink-0"
                    />
                    <div className="min-w-0">
                        <h1 className="text-xs md:text-sm lg:text-base font-extrabold text-gray-900 dark:text-white leading-tight uppercase tracking-wider">
                            Portal da <br className="md:hidden" /> Transparência
                        </h1>
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-semibold">Vila Pinheiro</p>
                    </div>
                </Link>

                <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
                    <Link
                        to="/doacao"
                        className="bg-[#4FD1C5] hover:bg-[#38B2AC] text-white font-extrabold py-1.5 px-3.5 md:py-1.5 md:px-4 rounded-full text-sm md:text-sm flex items-center justify-center gap-1 transition-all hover:scale-105 shadow-md animate-bounce hover:animate-none whitespace-nowrap"
                    >
                        <span className="md:hidden">DOAÇÃO</span>
                        <span className="hidden md:inline">Faça sua doação AQUI</span>
                    </Link>
                    <ThemeToggle />
                    <Link
                        to="/admin"
                        className="text-gray-400 hover:text-blue-900 dark:text-gray-500 dark:hover:text-blue-400 transition-colors p-1 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Acesso Tesouraria"
                    >
                        <Lock size={16} className="md:w-[18px] md:h-[18px]" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

