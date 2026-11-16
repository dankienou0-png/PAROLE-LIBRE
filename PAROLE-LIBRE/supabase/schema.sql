-- PAROLE LIBRE — schéma initial Supabase
-- Les routes Next.js accèdent aux tables avec une clé secrète exclusivement serveur.
create extension if not exists pgcrypto;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  recipient text not null check (recipient in ('direction','delegue')),
  category text null check (category is null or category in ('reclamation','suggestion','harcelement','enseignement','discipline','infrastructure','autre')),
  body text not null check (char_length(body) between 10 and 5000),
  tracking_hash text not null unique,
  status text not null default 'new' check (status in ('new','read','answered','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  author_id uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;
alter table public.replies enable row level security;

-- Aucun accès direct depuis le navigateur. Les routes serveur doivent contrôler
-- chaque opération avant d'utiliser leur clé secrète Supabase.
revoke all on public.messages from anon, authenticated;
revoke all on public.replies from anon, authenticated;
grant usage on schema public to service_role;
grant select, insert, update, delete on public.messages to service_role;
grant select, insert, update, delete on public.replies to service_role;


-- Institution and staff roles (pilot: LTA)
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
