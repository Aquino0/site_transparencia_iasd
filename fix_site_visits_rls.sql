-- ==========================================
-- SCRIPT DE CORREÇÃO DE SEGURANÇA (RLS)
-- ==========================================
-- Rode este comando no "SQL Editor" do seu painel do Supabase.

-- 1. Remove a política antiga (se houver)
DROP POLICY IF EXISTS "Permitir inserção de visitas para todos" ON public.site_visits;

-- 2. Cria a nova política corrigida (sem travar por papel 'anon')
CREATE POLICY "Permitir inserção de visitas para todos" 
ON public.site_visits 
FOR INSERT 
WITH CHECK (true);

-- ==========================================
-- FIM DO SCRIPT
-- ==========================================
