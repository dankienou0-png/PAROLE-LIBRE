# Sécurité et confidentialité — à lire avant déploiement

## Ce que l'application protège
- Le formulaire ne demande ni nom, ni adresse e-mail, ni compte élève.
- Le code de suivi est généré aléatoirement et seul son empreinte SHA-256 est stockée dans la base.
- Les tables ne sont pas directement accessibles depuis les rôles Supabase `anon` et `authenticated`.

## Limites importantes
« Anonyme » signifie ici que le destinataire ne reçoit pas d'identité déclarée par le formulaire. Cela ne garantit PAS l'anonymat absolu : l'hébergeur, les journaux serveur, le réseau ou un administrateur technique peuvent traiter des métadonnées (adresse IP, heure, etc.). Ne présentez jamais ce service comme impossible à tracer.

## Avant toute mise en production
1. Configurer les variables Supabase dans `.env.local` et dans l'hébergeur.
2. Exécuter `supabase/schema.sql`.
3. Construire l'authentification des responsables et l'espace de gestion protégé (Directeur / DG élèves). Cette première version ne fournit pas encore de tableau de bord responsable ni d'interface de réponse.
4. Remplacer l'accès public via les routes API par des contrôles anti-abus : limitation de débit, CAPTCHA adapté, taille maximale, journalisation minimale.
5. Ajouter des politiques RLS et vérifier les rôles côté serveur. Ne jamais exposer la clé `service_role` dans le navigateur.
6. Prévoir une procédure de signalement urgent, modération et traitement des menaces ou du harcèlement.
7. Définir une durée de conservation, une politique de suppression et les responsables du traitement des données.
8. Faire réaliser un audit de sécurité et tester les routes avant d'ouvrir aux élèves.

## Attention
La route de dépôt et la consultation par code nécessitent une configuration Supabase valide. Les messages peuvent contenir des informations sensibles : limitez l'accès aux personnes autorisées.
