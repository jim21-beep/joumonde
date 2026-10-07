-- Run once in the Supabase SQL editor before deploying the product-reviews function.

alter table public.orders
  add column if not exists payment_method text,
  add column if not exists payment_status text not null default 'pending',
  add column if not exists payment_provider text,
  add column if not exists provider_payment_id text;

create unique index if not exists orders_provider_payment_id_unique
  on public.orders (provider_payment_id)
  where provider_payment_id is not null;

-- A client must never create an order or its items directly. The trusted server path
-- creates pending orders; a payment provider webhook will mark them paid later.
drop policy if exists "Eigen Bestellungen anlegen" on public.orders;
drop policy if exists "Eigen Bestellpositionen anlegen" on public.order_items;

create table if not exists public.product_reviews (
  id           uuid primary key default uuid_generate_v4(),
  order_id     text not null references public.orders(id) on delete cascade,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  product_name text not null,
  display_name text not null,
  rating       smallint not null check (rating between 1 and 5),
  title        text not null check (char_length(title) between 3 and 80),
  review_text  text not null check (char_length(review_text) between 20 and 1000),
  status       text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at   timestamptz not null default now(),
  unique (order_id, user_id, product_name)
);

create index if not exists product_reviews_public_lookup
  on public.product_reviews (product_name, status, created_at desc);

alter table public.product_reviews enable row level security;
grant select on public.product_reviews to anon, authenticated;
drop policy if exists "Freigegebene Produktbewertungen lesen" on public.product_reviews;
create policy "Freigegebene Produktbewertungen lesen" on public.product_reviews
  for select using (status = 'approved');

-- There is intentionally no client INSERT, UPDATE, or DELETE policy for reviews.
