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
