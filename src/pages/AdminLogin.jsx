import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useFinancial();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(email, password);
        if (success) {
            navigate('/admin/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6 text-blue-900">
                    <div className="p-4 bg-blue-50 rounded-full">
                        <div className="bg-blue-900 text-white p-3 rounded-full">
                            <Lock size={32} />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Acesso Restrito</h2>
                <p className="text-center text-gray-500 mb-8">Área exclusiva para a tesouraria</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="admin@iasd.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-gray-500 hover:text-blue-900 text-sm flex items-center justify-center gap-1">
                        <ArrowLeft size={16} /> Voltar ao Portal
                    </Link>
                </div>
            </div>
        </div>
    );
}
