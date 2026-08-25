create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text,
  customer_phone text,
  instagram text,
  delivery_method text,
  delivery_fee numeric not null default 0,
  address text,
  notes text,
  items jsonb not null default '[]'::jsonb,
  extras jsonb not null default '{}'::jsonb,
  total numeric not null default 0,
  status text not null default 'new'
);

alter table public.orders enable row level security;

create policy "Anyone can submit orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

create policy "Signed-in admins can view orders"
  on public.orders for select
  to authenticated
  using (true);