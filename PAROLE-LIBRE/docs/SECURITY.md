# Sécurité et confidentialité — à lire avant déploiement

## Protections actuellement en place
- Le formulaire ne demande ni nom, ni adresse e-mail, ni compte élève.
- Le code de suivi est aléatoire ; seule son empreinte SHA-256 est enregistrée.
- Les tables `messages` et `replies` ont RLS activé.
- Les rôles `anon` et `authenticated` n'ont aucun privilège direct sur ces tables.
- Les routes Next.js utilisent une clé Supabase secrète uniquement côté serveur. Cette clé contourne RLS : les contrôles d'accès doivent donc être implémentés et vérifiés dans chaque route qui l'utilise.

## Limites importantes
« Anonyme » signifie ici que le destinataire ne reçoit pas d'identité déclarée par le formulaire. Cela ne garantit PAS l'anonymat absolu : l'hébergeur, les journaux serveur, le réseau ou un administrateur technique peuvent traiter des métadonnées (adresse IP, heure, etc.). Ne présentez jamais ce service comme impossible à tracer.

## Configuration des clés
- `NEXT_PUBLIC_SUPABASE_URL` : URL du projet.
- `SUPABASE_SECRET_KEY` : clé secrète `sb_secret_...`, côté serveur uniquement.
- `SUPABASE_SERVICE_ROLE_KEY` : ancien nom encore accepté temporairement par le code.

Ne jamais préfixer la clé secrète par `NEXT_PUBLIC_`, la placer dans le navigateur, ni la committer dans Git. Si elle est exposée, la révoquer/faire une rotation immédiatement.

## Avant toute mise en production
1. Configurer les variables Supabase dans `.env.local` et dans l'hébergeur, puis redéployer.
2. Vérifier que le schéma de la base correspond à `supabase/schema.sql` et aux migrations versionnées.
3. Construire l'authentification des responsables et l'espace de gestion protégé (Directeur / DG élèves). Cette version ne fournit pas encore de tableau de bord responsable ni d'interface de réponse.
4. Ajouter une limitation de débit robuste, anti-spam, protection contre les abus et contrôles de taille sur les routes publiques.
5. Vérifier côté serveur l'autorisation de chaque opération privilégiée. Ne jamais faire confiance à un rôle ou une identité provenant uniquement du navigateur.
6. Conserver les tables sans accès direct public tant que des politiques RLS adaptées aux rôles n'ont pas été conçues et testées. Ne pas créer de politique publique permissive pour contourner une erreur.
7. Prévoir une procédure de signalement urgent, modération et traitement des menaces ou du harcèlement.
8. Définir une durée de conservation, une politique de suppression et les responsables du traitement des données.
9. Faire réaliser un audit de sécurité et tester les routes avant d'ouvrir aux élèves.

## Attention
La soumission et la consultation par code nécessitent une configuration Supabase valide. Le code de suivi est un secret d'accès : l'élève doit le conserver privé. Les messages peuvent contenir des informations sensibles ; limitez leur accès aux personnes autorisées.
