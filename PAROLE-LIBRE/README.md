# PAROLE LIBRE

**Un espace où chaque élève peut dire ce qu'il n'ose pas dire.**

Application web responsive permettant aux élèves d'envoyer un message sans renseigner leur identité, au Directeur ou au DG des élèves, puis de consulter les réponses à l'aide d'un code privé.

## Stack
- Next.js 15, React 19, TypeScript
- Supabase PostgreSQL
- API routes serveur

## Installation
```bash
npm install
cp .env.example .env.local
```

Renseigner les variables :
- `NEXT_PUBLIC_SUPABASE_URL` : URL du projet Supabase.
- `SUPABASE_SECRET_KEY` : clé secrète `sb_secret_...`, uniquement côté serveur. Une ancienne clé `service_role` peut être utilisée temporairement sous le nom `SUPABASE_SERVICE_ROLE_KEY`.

**Ne jamais placer une clé secrète dans une variable `NEXT_PUBLIC_*`, dans le code client ou dans Git.** Dans Vercel, ajouter les variables dans les paramètres du projet puis redéployer.

Exécuter `supabase/schema.sql` dans le SQL Editor de Supabase si le schéma n'a pas encore été créé. La migration versionnée correspondante se trouve dans `supabase/migrations/`.

Puis :
```bash
npm run dev
```
Ouvrir http://localhost:3000.

## Fonctionnalités présentes
- Accueil et formulaire d'envoi.
- Destinataire : Directeur ou DG des élèves.
- Sujet facultatif : le message libre ne dépend pas d'une catégorie.
- Code privé aléatoire généré à chaque envoi ; seule son empreinte est stockée.
- Consultation du message et des réponses par code privé.

## État et limites
Cette base n'est pas encore prête pour une ouverture publique à un établissement. Le tableau de bord des responsables, leur authentification/autorisation, la rédaction des réponses, les transferts, les statistiques et l'audit ne sont pas encore implémentés. La clé secrète donne un accès privilégié à la base : les routes serveur qui l'utilisent doivent rester strictement limitées et faire l'objet d'une revue de sécurité avant production.

L'anonymat signifie que le formulaire ne demande pas d'identité et que le destinataire ne reçoit pas de nom déclaré. Il ne garantit pas un anonymat absolu vis-à-vis des métadonnées réseau et hébergeur.

## Structure
- `src/app` : pages et API
- `src/components` : composants d'interface
- `src/lib` : client Supabase serveur
- `supabase/schema.sql` : schéma de base de données
- `supabase/migrations/` : migrations versionnées
- `docs/SECURITY.md` : exigences de sécurité
- `docs/VISION-PRODUIT.md` : vision produit
