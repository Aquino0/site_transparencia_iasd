import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSiteVisits() {
    const [visits, setVisits] = useState([]);
    const [loadingVisits, setLoadingVisits] = useState(true);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_visits')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (!error) setVisits(data || []);
            } catch (err) {
                console.error('Erro ao buscar visitas:', err);
            } finally {
                setLoadingVisits(false);
            }
        };
        fetchVisits();
    }, []);

    const totalVisitsCount = visits.length;
    const today = new Date().toISOString().split('T')[0];
    const visitsToday = visits.filter(v => v.created_at && v.created_at.startsWith(today)).length;

    const cityCounts = visits.reduce((acc, visit) => {
        const city = visit.city || 'Desconhecida';
        const country = visit.country || '';
        const key = country ? `${city} (${country})` : city;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    const topCities = Object.entries(cityCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return {
        visits,
        loadingVisits,
        totalVisitsCount,
        visitsToday,
        topCities
    };
}
