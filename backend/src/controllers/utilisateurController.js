
const Utilisateur = require("../models/utilisateurModel");
const bcrypt = require("bcryptjs");

exports.createUtilisateur = (req, res) => {
  const { nom_utilisateur, email, mot_de_passe, role } = req.body;
  const mot_de_passe_hash = bcrypt.hashSync(mot_de_passe, 8);

  Utilisateur.create(
    { nom_utilisateur, email, mot_de_passe_hash, role },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la création de l'utilisateur.");
      }
      res.status(201).send({ message: "Utilisateur créé avec succès !", utilisateur_id: result.utilisateur_id });
    }
  );
};

exports.getUtilisateurs = (req, res) => {
  Utilisateur.getAll((err, utilisateurs) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des utilisateurs.");
    }
    res.status(200).json(utilisateurs);
  });
};

exports.getUtilisateurById = (req, res) => {
  Utilisateur.findById(req.params.id, (err, utilisateur) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération de l'utilisateur.");
    }
    if (!utilisateur) {
      return res.status(404).send("Utilisateur non trouvé.");
    }
    res.status(200).json(utilisateur);
  });
};

exports.updateUtilisateur = (req, res) => {
  const { nom_utilisateur, email, mot_de_passe, role, score_confiance } = req.body;
  let mot_de_passe_hash = mot_de_passe;
  if (mot_de_passe) {
    mot_de_passe_hash = bcrypt.hashSync(mot_de_passe, 8);
  }

  Utilisateur.update(
    req.params.id,
    { nom_utilisateur, email, mot_de_passe_hash, role, score_confiance },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la mise à jour de l'utilisateur.");
      }
      if (result.changes === 0) {
        return res.status(404).send("Utilisateur non trouvé.");
      }
      res.status(200).send({ message: "Utilisateur mis à jour avec succès !" });
    }
  );
};

exports.login = (req, res) => {
  const { email, mot_de_passe } = req.body;

  Utilisateur.findByEmail(email, (err, utilisateur) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la connexion.");
    }
    if (!utilisateur) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    const passwordIsValid = bcrypt.compareSync(mot_de_passe, utilisateur.mot_de_passe_hash);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Mot de passe incorrect !" });
    }

    // Dans une vraie app, on générerait un JWT ici. Pour cette démo, on renvoie l'utilisateur sans le hash.
    const { mot_de_passe_hash, ...userWithoutPassword } = utilisateur;
    res.status(200).send({
      message: "Connexion réussie !",
      user: userWithoutPassword
    });
  });
};

exports.deleteUtilisateur = (req, res) => {

  Utilisateur.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression de l'utilisateur.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Utilisateur non trouvé.");
    }
    res.status(200).send({ message: "Utilisateur supprimé avec succès !" });
  });
};
