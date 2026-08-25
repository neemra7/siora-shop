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

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  subscription jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

create policy "Users can manage their own push subscriptions"
  on public.push_subscriptions for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('order-images', 'order-images', true)
on conflict (id) do update set public = true;

create policy "Authenticated admins can upload order images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'order-images');

create policy "Customers can upload order images"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'order-images');

create policy "Anyone can view order images"
  on storage.objects for select
  to public
  using (bucket_id = 'order-images');