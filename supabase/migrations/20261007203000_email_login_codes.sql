create table if not exists public.email_login_codes (
  email_hash text primary key check (email_hash ~ '^[0-9a-f]{64}$'),
  code_hash text not null check (code_hash ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz not null,
  attempts smallint not null default 0 check (attempts between 0 and 5),
  consumed_at timestamptz,
  sent_at timestamptz not null default now()
);

create table if not exists public.email_login_ip_limits (
  ip_hash text primary key check (ip_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0,
  verify_count integer not null default 0
);

alter table public.email_login_codes enable row level security;
alter table public.email_login_ip_limits enable row level security;

revoke all on public.email_login_codes from public, anon, authenticated;
revoke all on public.email_login_ip_limits from public, anon, authenticated;

create or replace function public.issue_email_login_code(
  p_email_hash text,
  p_ip_hash text,
  p_code_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ip_count integer;
  v_issued integer;
begin
  if p_email_hash !~ '^[0-9a-f]{64}$'
    or p_ip_hash !~ '^[0-9a-f]{64}$'
    or p_code_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid_hash';
  end if;

  insert into public.email_login_ip_limits (ip_hash, window_started_at, request_count, verify_count)
  values (p_ip_hash, now(), 1, 0)
  on conflict (ip_hash) do update
  set request_count = case
        when public.email_login_ip_limits.window_started_at <= now() - interval '1 hour' then 1
        else public.email_login_ip_limits.request_count + 1
      end,
      verify_count = case
        when public.email_login_ip_limits.window_started_at <= now() - interval '1 hour' then 0
        else public.email_login_ip_limits.verify_count
      end,
      window_started_at = case
        when public.email_login_ip_limits.window_started_at <= now() - interval '1 hour' then now()
        else public.email_login_ip_limits.window_started_at
      end
  returning request_count into v_ip_count;

  if v_ip_count > 20 then
    return false;
  end if;

  insert into public.email_login_codes (email_hash, code_hash, expires_at, attempts, sent_at)
  values (p_email_hash, p_code_hash, now() + interval '10 minutes', 0, now())
  on conflict (email_hash) do update
  set code_hash = excluded.code_hash,
      expires_at = excluded.expires_at,
      attempts = 0,
  consumed_at = null,
  sent_at = excluded.sent_at
  where public.email_login_codes.sent_at <= now() - interval '60 seconds'
  returning 1 into v_issued;

  delete from public.email_login_ip_limits
  where window_started_at < now() - interval '1 day';
  delete from public.email_login_codes
  where expires_at < now() - interval '1 day';

  return v_issued is not null;
end;
$$;

create or replace function public.consume_email_login_code(
  p_email_hash text,
  p_code_hash text,
  p_ip_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code public.email_login_codes%rowtype;
  v_verify_count integer;
begin
  if p_email_hash !~ '^[0-9a-f]{64}$'
    or p_code_hash !~ '^[0-9a-f]{64}$'
    or p_ip_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid_hash';
  end if;

  insert into public.email_login_ip_limits (ip_hash, window_started_at, request_count, verify_count)
  values (p_ip_hash, now(), 0, 1)
  on conflict (ip_hash) do update
  set verify_count = case
        when public.email_login_ip_limits.window_started_at <= now() - interval '1 hour' then 1
        else public.email_login_ip_limits.verify_count + 1
      end,
      request_count = case
        when public.email_login_ip_limits.window_started_at <= now() - interval '1 hour' then 0
        else public.email_login_ip_limits.request_count
      end,
      window_started_at = case
        when public.email_login_ip_limits.window_started_at <= now() - interval '1 hour' then now()
        else public.email_login_ip_limits.window_started_at
      end
  returning verify_count into v_verify_count;

  if v_verify_count > 100 then
    return false;
  end if;

  select *
  into v_code
  from public.email_login_codes
  where email_hash = p_email_hash
  for update;

  if not found then
    return false;
  end if;

  if v_code.expires_at <= now() then
    delete from public.email_login_codes where email_hash = p_email_hash;
    return false;
  end if;

  if v_code.attempts >= 5 or v_code.consumed_at is not null then
    return false;
  end if;

  if v_code.code_hash = p_code_hash then
    update public.email_login_codes
    set consumed_at = now()
    where email_hash = p_email_hash;
    return true;
  end if;

  update public.email_login_codes
  set attempts = attempts + 1
  where email_hash = p_email_hash;

  return false;
end;
$$;

create or replace function public.discard_email_login_code(
  p_email_hash text,
  p_code_hash text
)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.email_login_codes
  where email_hash = p_email_hash
    and code_hash = p_code_hash;
$$;

revoke all on function public.issue_email_login_code(text, text, text) from public, anon, authenticated;
revoke all on function public.consume_email_login_code(text, text, text) from public, anon, authenticated;
revoke all on function public.discard_email_login_code(text, text) from public, anon, authenticated;

grant execute on function public.issue_email_login_code(text, text, text) to service_role;
grant execute on function public.consume_email_login_code(text, text, text) to service_role;
grant execute on function public.discard_email_login_code(text, text) to service_role;
