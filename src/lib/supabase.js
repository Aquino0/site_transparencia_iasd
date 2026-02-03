import { createClient } from '@supabase/supabase-js';

// Tenta pegar variáveis de ambiente ou usa strings vazias (para não quebrar build)
// O usuário deverá configurar isso
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);
