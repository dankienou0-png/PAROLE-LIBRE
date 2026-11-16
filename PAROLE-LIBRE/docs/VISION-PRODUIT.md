# PAROLE LIBRE — Vision produit

> **Ta voix compte. Même anonymement.**

## 1. Mission

PAROLE LIBRE est une plateforme indépendante de participation et de dialogue destinée aux élèves et étudiants. Elle leur permet de s'exprimer sur les sujets liés à leur établissement, de signaler des difficultés et de contribuer à des changements concrets, y compris lorsqu'ils craignent de prendre la parole ouvertement.

La plateforme poursuit cinq objectifs :
- donner la parole aux élèves et étudiants sur les questions de la vie scolaire ;
- améliorer le dialogue entre les apprenants et l'administration ;
- protéger les personnes qui souhaitent s'exprimer sans révéler leur identité aux destinataires ;
- faciliter la participation et le changement au sein des établissements ;
- permettre le signalement de problèmes et de situations préoccupantes.

## 2. Public et périmètre

- Élèves et étudiants, dans les établissements secondaires et les universités.
- Établissements publics et privés.
- Déploiement multi-établissements avec une ambition nationale au Burkina Faso.
- Service indépendant des établissements, avec des espaces de gestion distincts.

## 3. Principes fondamentaux

1. **Anonymat vis-à-vis des destinataires :** le directeur, la direction générale des élèves et les autres responsables autorisés ne doivent pas recevoir l'identité de l'expéditeur.
2. **Aucun compte étudiant obligatoire :** l'envoi d'un message ne doit pas exiger un nom ou une adresse e-mail.
3. **Confidentialité par défaut :** les messages ne sont jamais publiés publiquement par défaut.
4. **Expression libre :** l'étudiant peut écrire librement sur un sujet lié à son établissement ; les catégories ne doivent pas empêcher l'envoi.
5. **Responsabilité :** les responsables doivent traiter les messages dans un cadre sécurisé et traçable.
6. **Transparence :** l'interface doit expliquer clairement ce que l'anonymat protège et ses limites techniques.

> **Limite importante :** aucune plateforme connectée à Internet ne peut promettre un anonymat absolu. Les données techniques du réseau, de l'hébergement ou les journaux de sécurité peuvent laisser des traces. PAROLE LIBRE doit minimiser les données collectées, limiter les journaux et leur durée de conservation, protéger les accès et expliquer honnêtement ces limites.

## 4. Parcours étudiant

1. L'étudiant choisit son établissement.
2. Il rédige librement son message sans créer de compte.
3. Il choisit le destinataire disponible, notamment la Direction ou la DG des élèves.
4. La plateforme génère un code privé aléatoire permettant de retrouver le suivi de son message.
5. L'étudiant conserve ce code ; il ne doit pas être affiché publiquement.
6. Il peut consulter l'état du traitement et les réponses avec ce code.
7. Après traitement, il peut évaluer la réponse.

Le code de suivi doit être suffisamment imprévisible. Dans la base de données, il convient de conserver une empreinte sécurisée du code plutôt que le code en clair, lorsque l'architecture le permet.

## 5. Destinataires et espaces de gestion

Les responsables disposent d'espaces séparés :
- **Direction :** reçoit uniquement les messages qui lui sont adressés ou qui lui ont été explicitement transférés.
- **DG des élèves :** dispose de sa propre boîte de réception et ne voit que les messages autorisés.
- **Autres responsables autorisés :** peuvent recevoir un transfert explicite selon les règles de l'établissement.

Chaque espace permet, selon les permissions :
- de consulter les messages reçus ;
- de répondre à l'expéditeur ;
- de classer les messages après réception ;
- de définir une priorité ;
- de transférer un message à un responsable autorisé ;
- de suivre les états de traitement ;
- de consulter des statistiques adaptées à son rôle.

Les réponses doivent être présentées distinctement du message initial, et non sous forme de conversation de messagerie instantanée.

## 6. États de traitement

Le suivi étudiant doit proposer des états compréhensibles :
- **Reçu** ;
- **En cours** ;
- **Traité** ;
- **Clôturé**.

Les changements d'état et les actions des responsables doivent être enregistrés dans un historique d'audit protégé.

## 7. Notifications

L'étudiant souhaite être averti lorsqu'une réponse arrive. Le mécanisme reste **à définir** : notification Android anonyme, consultation à l'aide du code privé, ou combinaison des deux. Cette décision ne doit pas bloquer la conception des autres fonctionnalités.

## 8. Expérience et plateformes

- Priorité à une expérience mobile Android.
- Interface web responsive pour couvrir les autres appareils.
- Fonctionnement adapté aux connexions Internet faibles : pages légères, brouillon temporaire, reprise des envois et prévention des doublons.
- L'envoi et la synchronisation nécessitent une connexion Internet : la résilience au faible débit ne signifie pas un fonctionnement entièrement hors ligne.
- Interface simple, rapide et originale, inspirée des usages accessibles des applications de messages anonymes sans copier leur identité visuelle ni leurs fonctionnalités propriétaires.

## 9. Sécurité et gouvernance

La conception et l'implémentation doivent inclure :
- authentification robuste des responsables ;
- rôles et autorisations vérifiés côté serveur ;
- isolation des données entre établissements et entre destinataires ;
- politiques RLS correctement testées dans Supabase ;
- protection contre le spam, les abus et les tentatives d'accès non autorisées ;
- limitation des données collectées et des durées de conservation ;
- sauvegardes et procédure de restauration ;
- journal d'audit des actions des responsables ;
- procédure de signalement urgent et de traitement des situations sensibles ;
- revue de sécurité et tests avant tout lancement public.

Aucune clé privilégiée Supabase ne doit être exposée dans le navigateur ou dans le code client.

## 10. Principes de réalisation

Cette vision décrit la direction produit souhaitée. Elle ne signifie pas que toutes les fonctions sont déjà présentes ou opérationnelles dans le code actuel. Chaque fonctionnalité doit être développée, testée et vérifiée avant d'être annoncée comme disponible.

Les priorités de réalisation sont :
1. fiabiliser l'envoi et le stockage des messages ;
2. sécuriser les données et les permissions ;
3. mettre en place le code privé et le suivi ;
4. construire les espaces distincts des responsables ;
5. ajouter les réponses, transferts, états et l'audit ;
6. traiter les notifications et les optimisations Android ;
7. réaliser les tests de sécurité, de charge et de faible connectivité avant le déploiement.

---

**Nom du produit :** PAROLE LIBRE  
**Signature :** Ta voix compte. Même anonymement.  
**Périmètre initial :** établissements secondaires et universités au Burkina Faso.
