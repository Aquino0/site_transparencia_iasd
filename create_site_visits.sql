-- ==========================================
-- SCRIPT PARA CRIAR A TABELA DE VISITAS
-- ==========================================
-- Rode este comando no "SQL Editor" do seu painel do Supabase.

-- 1. Cria a tabela
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    city TEXT,
    country TEXT,
    page TEXT DEFAULT '/'
);

-- 2. Habilita a segurança (RLS)
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- 3. Cria as políticas de acesso

-- Política A: Qualquer um pode INSERIR (para registrar a visita)
CREATE POLICY "Permitir inserção de visitas para todos" 
ON public.site_visits 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Política B: Apenas Autenticados (Admins) podem VER os dados
CREATE POLICY "Permitir leitura apenas para admins" 
ON public.site_visits 
FOR SELECT 
TO authenticated 
USING (true);

-- ==========================================
-- FIM DO SCRIPT
-- ==========================================
