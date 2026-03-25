import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useVisitTracker() {
    useEffect(() => {
        const trackVisit = async () => {
            try {
                // 1. Verifica se já foi registrado nesta sessão para não inflar os dados com F5
                const hasVisited = sessionStorage.getItem('portal_visited');
                if (hasVisited) return;

                // 2. Busca localização via API pública de IP (Gratuita para baixo volume)
                let city = 'Desconhecido';
                let country = 'Desconhecido';

                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();
                    
                    if (data.city) city = data.city;
                    if (data.country_name) country = data.country_name;
                } catch (apiError) {
                    // Falha silenciosamente (Ex: bloqueadores de anúncios (AdBlock) barrando o ipapi ou falha de rede)
                    // Continua mesmo se a localização falhar, apenas salvando como Desconhecido
                }

                // 3. Salva no Supabase
                const { error } = await supabase
                    .from('site_visits')
                    .insert([
                        {
                            city: city,
                            country: country,
                            page: window.location.pathname || '/'
                        }
                    ]);

                if (error) {
                    console.error('Erro ao registrar visita:', error);
                } else {
                    // 4. Marca que já visitou na sessão atual
                    sessionStorage.setItem('portal_visited', 'true');
                }

            } catch (err) {
                console.error('Erro no tracker de visitas:', err);
            }
        };

        trackVisit();
    }, []);
}
