create extension if not exists "uuid-ossp";

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  collection text not null check (collection in ('old-money', 'casual', 'accessories')),
  price numeric(10, 2) not null check (price >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null,
  color text not null,
  stock_quantity integer check (stock_quantity is null or stock_quantity >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, size, color)
);

create index if not exists product_variants_product_lookup
  on public.product_variants (product_id, is_active);

alter table public.products enable row level security;
alter table public.product_variants enable row level security;
revoke all on public.products, public.product_variants from public, anon, authenticated;
grant select on public.products, public.product_variants to anon, authenticated;

drop policy if exists "Aktive Produkte öffentlich lesen" on public.products;
create policy "Aktive Produkte öffentlich lesen"
  on public.products for select
  to anon, authenticated
  using (is_active);

drop policy if exists "Aktive Varianten öffentlicher Produkte lesen" on public.product_variants;
create policy "Aktive Varianten öffentlicher Produkte lesen"
  on public.product_variants for select
  to anon, authenticated
  using (
    is_active
    and exists (
      select 1 from public.products
      where products.id = product_variants.product_id
        and products.is_active
    )
  );

with product_seed(name, slug, collection, price, colors, sizes) as (
  values
    ('Klassischer Blazer', 'klassischer-blazer', 'old-money', 79.99::numeric, array['Navy', 'Schwarz', 'Grau', 'Beige', 'Burgundy', 'Camel']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Polo Hemd', 'polo-hemd', 'old-money', 34.99::numeric, array['Weiß', 'Navy', 'Schwarz', 'Grau', 'Camel']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Knit Zip-Polo', 'knit-zip-polo', 'old-money', 44.99::numeric, array['Beige', 'Weiß', 'Schwarz']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Bundfalthose', 'bundfalthose', 'old-money', 64.99::numeric, array['Beige', 'Camel', 'Navy', 'Grau', 'Olive']::text[], array['30', '32', '34', '36']::text[]),
    ('Elegante Weste', 'elegante-weste', 'old-money', 69.99::numeric, array['Creme', 'Navy', 'Grau', 'Schwarz']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Quarter Zipper', 'quarter-zipper', 'old-money', 79.99::numeric, array['Creme', 'Navy', 'Grau', 'Schwarz']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Strickpullover', 'strickpullover', 'old-money', 89.99::numeric, array['Dunkelblau', 'Weiß', 'Grau', 'Beige']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Leinenhose', 'leinenhose', 'old-money', 54.99::numeric, array['Beige', 'Weiß', 'Hellgrau', 'Navy']::text[], array['30', '32', '34', '36']::text[]),
    ('Kaschmirpullover', 'kaschmirpullover', 'old-money', 149.90::numeric, array['Creme', 'Dunkelblau', 'Grau']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Oxford Hemd', 'oxford-hemd', 'old-money', 59.90::numeric, array['Weiß', 'Hellblau']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Wollmantel', 'wollmantel', 'old-money', 249.90::numeric, array['Camel', 'Navy', 'Grau']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Oversized Hoodie', 'oversized-hoodie', 'casual', 49.99::numeric, array['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('T-Shirt', 't-shirt', 'casual', 24.99::numeric, array['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Cargo Pants', 'cargo-pants', 'casual', 59.99::numeric, array['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige']::text[], array['30', '32', '34', '36']::text[]),
    ('Jeans', 'jeans', 'casual', 59.99::numeric, array['Dunkelblau', 'Hellblau', 'Schwarz']::text[], array['30', '32', '34', '36']::text[]),
    ('Trainerhose', 'trainerhose', 'casual', 44.99::numeric, array['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige']::text[], array['S', 'M', 'L', 'XL']::text[]),
    ('Ledergürtel', 'lederguertel', 'accessories', 39.90::numeric, array['Dunkelbraun']::text[], array['One Size']::text[])
),
inserted_products as (
  insert into public.products (name, slug, collection, price)
  select name, slug, collection, price
  from product_seed
  on conflict (slug) do nothing
  returning id, slug
),
product_ids as (
  select id, slug from inserted_products
  union all
  select products.id, products.slug
  from public.products products
  join product_seed seed on seed.slug = products.slug
  where not exists (
    select 1 from inserted_products inserted
    where inserted.slug = products.slug
  )
)
insert into public.product_variants (product_id, size, color)
select product_ids.id, sizes.size, colors.color
from product_seed seed
join product_ids on product_ids.slug = seed.slug
cross join lateral unnest(seed.sizes) as sizes(size)
cross join lateral unnest(seed.colors) as colors(color)
on conflict (product_id, size, color) do nothing;
