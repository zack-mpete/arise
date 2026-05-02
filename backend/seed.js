const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const seedDatabase = async () => {
  try {
    console.log('Connexion à la base de données...');

    // 1. Vider les tables existantes (attention aux contraintes de clés étrangères)
    console.log('Nettoyage des données existantes...');
    await pool.query(`
      TRUNCATE TABLE 
        Projets_Etiquettes, Opportunites_Etiquettes, Etiquettes, 
        Signalements, Evaluations, Commentaires, 
        Favoris, Opportunites, Projets, Utilisateurs 
      RESTART IDENTITY CASCADE;
    `);

    // 2. Création des Utilisateurs (avec hachage des mots de passe)
    console.log('Création des utilisateurs...');
    const mdpHashAdmin = bcrypt.hashSync('admin123', 8);
    const mdpHashEntre = bcrypt.hashSync('entrepreneur123', 8);
    const mdpHashInvest = bcrypt.hashSync('investisseur123', 8);
    const mdpHashDev = bcrypt.hashSync('dev123', 8);

    const utilisateurs = await pool.query(`
      INSERT INTO Utilisateurs (nom_utilisateur, email, mot_de_passe_hash, role, score_confiance)
      VALUES 
        ('Admin System', 'admin@plateforme.com', $1, 'Administrateur', 5.00),
        ('Alice Innov', 'alice@startup.com', $2, 'Entrepreneur', 4.50),
        ('Bob Tech', 'bob@tech.com', $3, 'Entrepreneur', 3.80),
        ('Capital Ventures', 'contact@capital-ventures.com', $4, 'Investisseur', 4.90),
        ('Charlie Dev', 'charlie@code.com', $5, 'Développeur', 4.20)
      RETURNING utilisateur_id, nom_utilisateur;
    `, [mdpHashAdmin, mdpHashEntre, mdpHashEntre, mdpHashInvest, mdpHashDev]);

    const users = {
      admin: utilisateurs.rows[0].utilisateur_id,
      alice: utilisateurs.rows[1].utilisateur_id,
      bob: utilisateurs.rows[2].utilisateur_id,
      investisseur: utilisateurs.rows[3].utilisateur_id,
      dev: utilisateurs.rows[4].utilisateur_id
    };

    // 3. Création des Étiquettes
    console.log('Création des étiquettes...');
    const etiquettes = await pool.query(`
      INSERT INTO Etiquettes (nom_etiquette)
      VALUES ('IA'), ('GreenTech'), ('Fintech'), ('Web3'), ('Santé'), ('SaaS')
      RETURNING etiquette_id, nom_etiquette;
    `);

    const tags = {
      ia: etiquettes.rows[0].etiquette_id,
      greentech: etiquettes.rows[1].etiquette_id,
      fintech: etiquettes.rows[2].etiquette_id
    };

    // 4. Création des Projets
    console.log('Création des projets...');
    const projets = await pool.query(`
      INSERT INTO Projets (titre, description, statut, entrepreneur_id, certificat_pi)
      VALUES 
        ('EcoTrack', 'Application de suivi empreinte carbone', 'Validé', $1, 'PI-12345'),
        ('MediBrain', 'IA pour diagnostic médical', 'En attente validation Admin', $2, 'PI-67890'),
        ('CryptoPay', 'Solution de paiement décentralisée', 'Financé', $1, NULL)
      RETURNING projet_id;
    `, [users.alice, users.bob]);

    const p_ecotrack = projets.rows[0].projet_id;
    const p_medibrain = projets.rows[1].projet_id;
    const p_cryptopay = projets.rows[2].projet_id;

    // Lier projets et étiquettes
    await pool.query(`
      INSERT INTO Projets_Etiquettes (projet_id, etiquette_id) VALUES 
      ($1, $2), ($3, $4), ($5, $6)
    `, [p_ecotrack, tags.greentech, p_medibrain, tags.ia, p_cryptopay, tags.fintech]);

    // 5. Création des Opportunités
    console.log('Création des opportunités...');
    const opportunites = await pool.query(`
      INSERT INTO Opportunites (titre, description, type_opportunite, competences_requises, investisseur_id, statut)
      VALUES 
        ('Fonds Green 2026', 'Financement pour startups écologiques', 'Appel à Projets', NULL, $1, 'Ouverte'),
        ('Développeur React Senior', 'Besoin d''un expert frontend pour MVP', 'Demande de Talents', 'React, Node.js', $2, 'Ouverte')
      RETURNING opportunite_id;
    `, [users.investisseur, users.alice]);

    // 6. Création de Commentaires
    console.log('Ajout de commentaires...');
    await pool.query(`
      INSERT INTO Commentaires (contenu, utilisateur_id, projet_id)
      VALUES 
        ('Super initiative, je suis intéressé !', $1, $2),
        ('Avez-vous pensé à intégrer l''API XYZ ?', $3, $4)
    `, [users.investisseur, p_ecotrack, users.dev, p_medibrain]);

    // 7. Création des Évaluations
    console.log('Ajout des évaluations...');
    await pool.query(`
      INSERT INTO Evaluations (score, commentaire, evalue_par_utilisateur_id, utilisateur_evalue_id)
      VALUES 
        (5, 'Excellent entrepreneur, très réactif', $1, $2),
        (4, 'Bon développeur mais délais un peu longs', $3, $4)
    `, [users.investisseur, users.alice, users.alice, users.dev]);

    // 8. Création des Favoris
    console.log('Ajout des favoris...');
    await pool.query(`
      INSERT INTO Favoris (utilisateur_id, projet_id)
      VALUES 
        ($1, $2),
        ($3, $4),
        ($5, $2)
    `, [users.investisseur, p_ecotrack, users.alice, p_medibrain, users.dev]);

    console.log('✅ Jeu de données de test inséré avec succès !');

    // Résumé des mots de passe
    console.log('\n--- IDENTIFIANTS DE TEST ---');
    console.log('Admin        : admin@plateforme.com / admin123');
    console.log('Entrepreneur : alice@startup.com / entrepreneur123');
    console.log('Investisseur : contact@capital-ventures.com / investisseur123');
    console.log('Développeur  : charlie@code.com / dev123');
    console.log('----------------------------\n');

  } catch (err) {
    console.error('❌ Erreur lors du peuplement de la base:', err);
  } finally {
    pool.end();
  }
};

seedDatabase();
