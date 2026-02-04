-- Fix RLS policies for app_settings table
-- Drop existing restrictive policies
drop policy if exists "Enable read access for all users" on public.app_settings;
drop policy if exists "Enable insert for authenticated users only" on public.app_settings;
drop policy if exists "Enable update for authenticated users only" on public.app_settings;
drop policy if exists "Enable all for authenticated users" on public.app_settings;
drop policy if exists "Public read access" on public.app_settings;
drop policy if exists "Authenticated admin access" on public.app_settings;

-- Create comprehensive policies
-- 1. Everyone can READ (SELECT)
create policy "Public read access" on public.app_settings
  for select using (true);

-- 2. Authenticated users can DO AANYTHING (INSERT, UPDATE, DELETE)
create policy "Authenticated admin access" on public.app_settings
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
