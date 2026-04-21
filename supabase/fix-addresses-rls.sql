-- Fix: addresses RLS policies for insert/update/delete
-- Run this once in Supabase SQL Editor.

alter table public.addresses enable row level security;
alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, newsletter)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'firstName', ''),
    coalesce(new.raw_user_meta_data->>'lastName', ''),
    coalesce((new.raw_user_meta_data->>'newsletter')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into public.profiles (id, first_name, last_name, newsletter)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'firstName', ''),
  coalesce(u.raw_user_meta_data->>'lastName', ''),
  coalesce((u.raw_user_meta_data->>'newsletter')::boolean, false)
from auth.users u
on conflict (id) do nothing;

alter table public.addresses drop constraint if exists addresses_user_id_fkey;
alter table public.addresses
  add constraint addresses_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;

drop policy if exists "Eigen Profil anlegen" on public.profiles;
create policy "Eigen Profil anlegen"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Eigen Adressen" on public.addresses;
drop policy if exists "Eigen Adressen lesen" on public.addresses;
drop policy if exists "Eigen Adressen einfuegen" on public.addresses;
drop policy if exists "Eigen Adressen aktualisieren" on public.addresses;
drop policy if exists "Eigen Adressen loeschen" on public.addresses;

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
