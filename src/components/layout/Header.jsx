import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFinancial } from '../../context/FinancialContext';

export function Header() {
    const { settings } = useFinancial();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="/logo-iasd-oficial.png"
                        alt="Logo IASD Tesouraria"
                        className="h-16 w-auto object-contain"
                    />
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 leading-tight">IASD Vila Pinheiro</h1>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Portal da Transparência</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/admin"
                        className="text-gray-400 hover:text-blue-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                        title="Acesso Tesouraria"
                    >
                        <Lock size={18} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
