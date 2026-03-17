import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
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
        <div className="min-h-screen bg-gradient-to-br from-[#FDF6E3] to-[#E5F6F0] dark:from-gray-900 dark:to-gray-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white/50 dark:bg-gray-800/50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/60 dark:border-gray-700/30 backdrop-blur-md"
            >
                <div className="flex justify-center mb-6 text-emerald-800 dark:text-emerald-400">
                    <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full">
                        <div className="bg-emerald-600 dark:bg-emerald-600 text-white p-3 rounded-full">
                            <Lock size={32} />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Acesso Restrito</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Área exclusiva para a tesouraria</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
                            <input
                                type="email"
                                placeholder="admin@iasd.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 focus:border-blue-900 dark:focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 focus:border-blue-900 dark:focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 text-emerald-900 border border-emerald-200/40 shadow-sm font-semibold py-3 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-gray-100/50 dark:border-gray-700/30">
                    <Link to="/" className="w-full border border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 text-sm font-semibold flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-300 shadow-sm">
                        <ArrowLeft size={16} /> Voltar ao Portal
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
