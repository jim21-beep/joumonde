-- =============================================================
-- JOUMONDE – Supabase Schema
-- Im Supabase Dashboard > SQL Editor ausführen
-- =============================================================

-- UUID Extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------
-- PROFILES (wird automatisch bei Registrierung angelegt)
-- ------------------------------------------------------------------
create table public.profiles (
  id               uuid references auth.users(id) on delete cascade primary key,
  first_name       text not null default '',
  last_name        text not null default '',
  newsletter       boolean default false,
  default_currency text default 'CHF',
  default_language text default 'de',
  default_size     text,
  created_at       timestamptz default now()
);

-- ------------------------------------------------------------------
-- ADDRESSES
-- ------------------------------------------------------------------
create table public.addresses (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  street     text,
  zip        text,
  city       text,
  country    text default 'Schweiz',
  phone      text,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------------
-- ORDERS (Bestellnummern wie JM1713000000)
-- ------------------------------------------------------------------
create table public.orders (
  id         text primary key,
  user_id    uuid references public.profiles(id) on delete set null,
  status     text default 'Bearbeitung',
  total      numeric(10,2),
  currency   text default 'CHF',
  payment_method text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  payment_provider text,
  provider_payment_id text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders
  add column if not exists payment_method text,
  add column if not exists payment_status text not null default 'pending',
  add column if not exists payment_provider text,
  add column if not exists provider_payment_id text;

-- ------------------------------------------------------------------
-- ORDER ITEMS (Positionen einer Bestellung)
-- ------------------------------------------------------------------
create table public.order_items (
  id             uuid default uuid_generate_v4() primary key,
  order_id       text references public.orders(id) on delete cascade not null,
  article_number text,
  product_name   text,
  quantity       integer default 1 check (quantity > 0),
  unit_price     numeric(10,2),
  size           text,
  color          text
);

-- Product reviews: only verified delivered orders may submit, and only approved rows are public.
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

-- ------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------------
alter table public.profiles       enable row level security;
alter table public.addresses      enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;
alter table public.product_reviews enable row level security;

-- Profiles: nur eigenes Profil lesen/bearbeiten
create policy "Eigen Profil lesen"       on public.profiles for select using (auth.uid() = id);
create policy "Eigen Profil anlegen"     on public.profiles for insert with check (auth.uid() = id);
create policy "Eigen Profil aktualisieren" on public.profiles for update using (auth.uid() = id);

-- Addresses: nur eigene Adressen
create policy "Eigen Adressen lesen"
  on public.addresses for select
  using (auth.uid() = user_id);

create policy "Eigen Adressen einfuegen"
  on public.addresses for insert
  with check (auth.uid() = user_id);

create policy "Eigen Adressen aktualisieren"
  on public.addresses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Eigen Adressen loeschen"
  on public.addresses for delete
  using (auth.uid() = user_id);

-- Orders: nur eigene Bestellungen lesen
create policy "Eigen Bestellungen lesen" on public.orders for select using (auth.uid() = user_id);
drop policy if exists "Eigen Bestellungen anlegen" on public.orders;

-- Order Items: lesen wenn Bestellung dem User gehört
create policy "Eigen Bestellpositionen lesen" on public.order_items for select
  using (order_id in (select id from public.orders where user_id = auth.uid()));
drop policy if exists "Eigen Bestellpositionen anlegen" on public.order_items;

grant select on public.product_reviews to anon, authenticated;
create policy "Freigegebene Produktbewertungen lesen" on public.product_reviews
  for select using (status = 'approved');

-- ------------------------------------------------------------------
-- TRIGGER: Profil automatisch bei Registrierung anlegen
-- ------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, newsletter)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'firstName', ''),
    coalesce(new.raw_user_meta_data->>'lastName', ''),
    coalesce((new.raw_user_meta_data->>'newsletter')::boolean, false)
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------------
-- NEWSLETTER SUBSCRIBERS
-- ------------------------------------------------------------------
create table public.newsletter_subscribers (
  id                 uuid default uuid_generate_v4() primary key,
  email              text not null unique,
  name               text,
  source             text default 'website',
  confirmed          boolean default false,
  confirmation_token text,
  subscribed_at      timestamptz default now()
);

-- Öffentlich eintragen (kein Login nötig), aber nur eigene E-Mail lesen
alter table public.newsletter_subscribers enable row level security;
create policy "Newsletter anmelden"
  on public.newsletter_subscribers for insert with check (true);

-- ------------------------------------------------------------------
-- TRIGGER: updated_at für orders
-- ------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();
