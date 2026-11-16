-- LTA pilot institution and isolated staff roles
create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);
insert into public.institutions (name, slug)
values ('LTA', 'lta')
on conflict (slug) do update set name = excluded.name;
alter table public.messages add column if not exists institution_id uuid references public.institutions(id);
update public.messages set institution_id = (select id from public.institutions where slug = 'lta') where institution_id is null;
create index if not exists messages_institution_recipient_created_idx
  on public.messages (institution_id, recipient, created_at desc);
create table if not exists public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  institution_id uuid not null references public.institutions(id) on delete restrict,
  role text not null check (role in ('director', 'delegue')),
  email text not null unique,
  created_at timestamptz not null default now()
);
alter table public.institutions enable row level security;
alter table public.staff_members enable row level security;
revoke all on public.institutions from anon, authenticated;
revoke all on public.staff_members from anon, authenticated;
grant usage on schema public to service_role;
grant select, insert, update, delete on public.institutions to service_role;
grant select, insert, update, delete on public.staff_members to service_role;
