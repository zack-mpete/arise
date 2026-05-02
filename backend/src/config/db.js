
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Requis pour Supabase dans certains environnements
  }
});

// Wrapper pour maintenir la compatibilité avec l'API sqlite3 utilisée dans les modèles
const db = {
  run: function (sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }

    // Conversion des placeholders ? en $1, $2... pour PostgreSQL
    let i = 1;
    const pgSql = sql.replace(/\?/g, () => `$${i++}`);

    // Pour les INSERT, on ajoute RETURNING pour simuler lastID de SQLite
    const isInsert = pgSql.trim().toUpperCase().startsWith('INSERT');
    const finalSql = isInsert ? `${pgSql} RETURNING *` : pgSql;

    pool.query(finalSql, params)
      .then(res => {
        // On simule l'objet 'this' de sqlite3
        const context = {
          changes: res.rowCount,
          lastID: isInsert && res.rows[0] ? res.rows[0][Object.keys(res.rows[0])[0]] : null
        };
        if (callback) callback.call(context, null, context);
      })
      .catch(err => {
        if (callback) callback(err);
      });
  },

  get: function (sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    let i = 1;
    const pgSql = sql.replace(/\?/g, () => `$${i++}`);
    pool.query(pgSql, params)
      .then(res => {
        if (callback) callback(null, res.rows[0]);
      })
      .catch(err => {
        if (callback) callback(err);
      });
  },

  all: function (sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    let i = 1;
    const pgSql = sql.replace(/\?/g, () => `$${i++}`);
    pool.query(pgSql, params)
      .then(res => {
        if (callback) callback(null, res.rows);
      })
      .catch(err => {
        if (callback) callback(err);
      });
  },

  exec: function (sql, callback) {
    pool.query(sql)
      .then(() => {
        if (callback) callback(null);
      })
      .catch(err => {
        if (callback) callback(err);
      });
  }
};

// Initialisation des tables (syntaxe PostgreSQL)
const initDb = async () => {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Utilisateurs (
        utilisateur_id SERIAL PRIMARY KEY,
        nom_utilisateur TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        mot_de_passe_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('Entrepreneur', 'Développeur', 'Investisseur', 'Administrateur')),
        score_confiance REAL DEFAULT 0.00,
        date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Projets (
        projet_id SERIAL PRIMARY KEY,
        titre TEXT NOT NULL,
        description TEXT NOT NULL,
        statut TEXT DEFAULT 'En attente validation IA' CHECK(statut IN ('En attente validation IA', 'En attente validation Admin', 'Validé', 'Financé', 'Rejeté')),
        date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        entrepreneur_id INTEGER NOT NULL REFERENCES Utilisateurs(utilisateur_id),
        certificat_pi TEXT,
        date_validation_ia TIMESTAMP,
        date_validation_admin TIMESTAMP,
        est_archive BOOLEAN DEFAULT FALSE
      );

      -- Assurer que la colonne existe pour les tables déjà créées
      ALTER TABLE Projets ADD COLUMN IF NOT EXISTS est_archive BOOLEAN DEFAULT FALSE;

      CREATE TABLE IF NOT EXISTS Opportunites (
        opportunite_id SERIAL PRIMARY KEY,
        titre TEXT NOT NULL,
        description TEXT NOT NULL,
        type_opportunite TEXT NOT NULL CHECK(type_opportunite IN ('Appel à Projets', 'Demande de Talents')),
        competences_requises TEXT,
        investisseur_id INTEGER NOT NULL REFERENCES Utilisateurs(utilisateur_id),
        date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        statut TEXT DEFAULT 'Ouverte' CHECK(statut IN ('Ouverte', 'Fermée', 'Pourvue'))
      );

      CREATE TABLE IF NOT EXISTS Commentaires (
        commentaire_id SERIAL PRIMARY KEY,
        contenu TEXT NOT NULL,
        date_commentaire TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        utilisateur_id INTEGER NOT NULL REFERENCES Utilisateurs(utilisateur_id),
        projet_id INTEGER REFERENCES Projets(projet_id),
        opportunite_id INTEGER REFERENCES Opportunites(opportunite_id)
      );

      CREATE TABLE IF NOT EXISTS Evaluations (
        evaluation_id SERIAL PRIMARY KEY,
        score INTEGER NOT NULL CHECK(score >= 1 AND score <= 5),
        commentaire TEXT,
        evalue_par_utilisateur_id INTEGER NOT NULL REFERENCES Utilisateurs(utilisateur_id),
        utilisateur_evalue_id INTEGER NOT NULL REFERENCES Utilisateurs(utilisateur_id),
        date_evaluation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Signalements (
        signalement_id SERIAL PRIMARY KEY,
        raison TEXT NOT NULL,
        date_signalement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        utilisateur_signalant_id INTEGER NOT NULL REFERENCES Utilisateurs(utilisateur_id),
        projet_signale_id INTEGER REFERENCES Projets(projet_id),
        commentaire_signale_id INTEGER REFERENCES Commentaires(commentaire_id),
        statut TEXT DEFAULT 'En attente' CHECK(statut IN ('En attente', 'Résolu', 'Rejeté')),
        administrateur_id INTEGER REFERENCES Utilisateurs(utilisateur_id)
      );

      CREATE TABLE IF NOT EXISTS Etiquettes (
        etiquette_id SERIAL PRIMARY KEY,
        nom_etiquette TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS Projets_Etiquettes (
        projet_id INTEGER NOT NULL REFERENCES Projets(projet_id),
        etiquette_id INTEGER NOT NULL REFERENCES Etiquettes(etiquette_id),
        PRIMARY KEY (projet_id, etiquette_id)
      );

      CREATE TABLE IF NOT EXISTS Opportunites_Etiquettes (
        opportunite_id INTEGER NOT NULL REFERENCES Opportunites(opportunite_id),
        etiquette_id INTEGER NOT NULL REFERENCES Etiquettes(etiquette_id),
        PRIMARY KEY (opportunite_id, etiquette_id)
      );

      CREATE TABLE IF NOT EXISTS Favoris (
        utilisateur_id INTEGER NOT NULL REFERENCES Utilisateurs(utilisateur_id),
        projet_id INTEGER NOT NULL REFERENCES Projets(projet_id) ON DELETE CASCADE,
        date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (utilisateur_id, projet_id)
      );
    `);
    console.log('Connecté à Supabase et tables vérifiées/créées.');
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de Supabase:', err.message);
  }
};

initDb();

module.exports = db;
