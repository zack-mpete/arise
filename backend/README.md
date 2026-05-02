
# Backend Plateforme d'Innovation

Ce projet est un backend modulaire construit avec Node.js, Express et SQLite.

## Structure du Projet

- `src/config/db.js` : Configuration et initialisation de la base de données SQLite.
- `src/models/` : Définition des modèles de données et interactions avec la base de données.
- `src/controllers/` : Logique métier pour chaque entité.
- `src/routes/` : Définition des points de terminaison de l'API.
- `src/app.js` : Configuration de l'application Express.
- `server.js` : Point d'entrée du serveur.

## Installation

1. Installez les dépendances :
   ```bash
   npm install
   ```

2. Démarrez le serveur :
   ```bash
   node server.js
   ```

## API Endpoints

- **Utilisateurs** : `/api/utilisateurs`
- **Projets** : `/api/projets`
- **Opportunités** : `/api/opportunites`
- **Commentaires** : `/api/commentaires`
- **Évaluations** : `/api/evaluations`
- **Signalements** : `/api/signalements`
- **Étiquettes** : `/api/etiquettes`

## Technologies utilisées

- Node.js
- Express
- SQLite3
- Bcryptjs (pour le hachage des mots de passe)
- Morgan (pour le logging)
- Cors
- Dotenv
