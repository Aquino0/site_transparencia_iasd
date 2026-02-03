-- Create table for storing monthly statistics
create table public.monthly_stats (
  id uuid default gen_random_uuid() primary key,
  month_key text not null, -- Format 'YYYY-MM'
  regular_members integer default 0,
  tithers_count integer default 0,
  offerers_count integer default 0,
  non_contributors_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(month_key)
);

-- Enable RLS
alter table public.monthly_stats enable row level security;

-- Policies
create policy "Enable read access for all users" on public.monthly_stats for select using (true);
create policy "Enable insert/update for authenticated users only" on public.monthly_stats for all using (auth.role() = 'authenticated');
