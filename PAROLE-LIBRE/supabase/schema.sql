-- PAROLE LIBRE — schéma initial Supabase
-- À exécuter dans Supabase SQL Editor avant de lancer l'application.
create extension if not exists pgcrypto;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  recipient text not null check (recipient in ('direction','delegue')),
  category text not null check (category in ('reclamation','suggestion','harcelement','enseignement','discipline','infrastructure','autre')),
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

-- Aucun accès direct anonyme aux tables. Les routes serveur utilisent la clé anon,
-- donc la lecture/écriture publique via cette clé est bloquée par défaut.
-- Pour production : ajouter une API serveur avec authentification des responsables,
-- politiques RLS par rôle, et une clé service_role stockée exclusivement côté serveur.
revoke all on public.messages from anon, authenticated;
revoke all on public.replies from anon, authenticated;

-- Les tables ne sont volontairement pas exposées aux élèves via le client Supabase.
