alter table public.orders
  add column if not exists customer_email text,
  add column if not exists shipping_address jsonb,
  add column if not exists admin_note text;
