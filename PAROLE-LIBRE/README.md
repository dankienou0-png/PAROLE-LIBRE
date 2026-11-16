# PAROLE LIBRE

**Un espace où chaque élève peut dire ce qu'il n'ose pas dire.**

Application web responsive (PWA-ready) permettant aux élèves d'envoyer un message sans renseigner leur identité, au Directeur ou au DG des élèves, puis de consulter les réponses à l'aide d'un code privé.

## Stack
- Next.js 15, React 19, TypeScript
- Supabase PostgreSQL
- API routes serveur

## Installation
```bash
npm install
cp .env.example .env.local
# Renseigner NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Exécuter ensuite `supabase/schema.sql` dans le SQL Editor du projet Supabase, puis :
```bash
npm run dev
```
Ouvrir http://localhost:3000.

## Fonctionnalités présentes
- Accueil et formulaire d'envoi.
- Destinataire : Directeur ou DG des élèves.
- Catégories : réclamation, suggestion, harcèlement, enseignement, discipline, infrastructure, autre.
- Code privé généré à chaque envoi, seule son empreinte est stockée.
- Consultation de la conversation par code (message initial et réponses en base).

## À terminer avant utilisation réelle
Cette livraison est une première base de code exécutable, pas un service prêt pour une école. Le tableau de bord des responsables, leur authentification/autorisation et l'interface de réponse ne sont pas encore inclus. Lire impérativement [docs/SECURITY.md](docs/SECURITY.md).

## Structure
- `src/app` : pages et API
- `src/components` : composants d'interface
- `src/lib` : client Supabase
- `supabase/schema.sql` : schéma de base de données
- `docs/SECURITY.md` : exigences de sécurité
