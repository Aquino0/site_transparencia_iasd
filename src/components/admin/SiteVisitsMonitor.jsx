import React from 'react';
import { Eye, Globe } from 'lucide-react';
import { useSiteVisits } from '../../hooks/useSiteVisits';

export function SiteVisitsMonitor() {
    const { visits, loadingVisits, totalVisitsCount, visitsToday, topCities } = useSiteVisits();

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 mb-8 transition-colors duration-300">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Eye size={20} className="text-purple-600 dark:text-purple-400" /> Acessos ao Site
            </h3>

            {loadingVisits ? (
                <p className="text-gray-500 text-sm">Carregando dados de acesso...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Resumo */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Total de Visitas</span>
                            <p className="text-3xl font-black text-purple-900 dark:text-white mt-1">{totalVisitsCount}</p>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">Visitas Hoje</span>
                            <p className="text-3xl font-black text-emerald-900 dark:text-white mt-1">{visitsToday}</p>
                        </div>
                    </div>

                    {/* Top Cidades */}
                    <div className="md:col-span-1">
                        <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1 border-b pb-1">
                            <Globe size={16} /> Principais Cidades
                        </h4>
                        <div className="space-y-1.5">
                            {topCities.length > 0 ? topCities.map(([city, count], idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded transition-colors">
                                    <span className="text-gray-600 dark:text-gray-400 truncate max-w-[160px]">{city}</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-200 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">{count}</span>
                                </div>
                            )) : (
                                <p className="text-gray-400 text-xs">Nenhuma visita registrada.</p>
                            )}
                        </div>
                    </div>

                    {/* Últimos Acessos */}
                    <div className="md:col-span-1">
                        <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3 border-b pb-1">Últimos Acessos</h4>
                        <div className="space-y-1 overflow-y-auto max-h-[160px] pr-2">
                            {visits.slice(0, 5).map((v, idx) => (
                                <div key={v.id || idx} className="text-xs p-1.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0 flex justify-between">
                                    <span className="truncate max-w-[120px] text-gray-600 dark:text-gray-400" title={v.city}>{v.city || 'Desconhecida'}</span>
                                    <span className="text-gray-400 text-[10px] flex items-center">
                                        {v.created_at ? new Date(v.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                                    </span>
                                </div>
                            ))}
                            {visits.length === 0 && <p className="text-gray-400 text-xs">Sem acessos recentes.</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
