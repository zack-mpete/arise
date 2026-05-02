
const Commentaire = require("../models/commentaireModel");

exports.createCommentaire = (req, res) => {
  const { contenu, utilisateur_id, projet_id, opportunite_id } = req.body;
  Commentaire.create({ contenu, utilisateur_id, projet_id, opportunite_id }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la création du commentaire.");
    }
    res.status(201).send({ message: "Commentaire créé avec succès !", commentaire_id: result.commentaire_id });
  });
};

exports.getCommentaires = (req, res) => {
  Commentaire.getAll((err, commentaires) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des commentaires.");
    }
    res.status(200).json(commentaires);
  });
};

exports.getCommentaireById = (req, res) => {
  Commentaire.findById(req.params.id, (err, commentaire) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération du commentaire.");
    }
    if (!commentaire) {
      return res.status(404).send("Commentaire non trouvé.");
    }
    res.status(200).json(commentaire);
  });
};

exports.getCommentairesByProjetId = (req, res) => {
  Commentaire.findByProjetId(req.params.projet_id, (err, commentaires) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des commentaires du projet.");
    }
    res.status(200).json(commentaires);
  });
};

exports.getCommentairesByOpportuniteId = (req, res) => {
  Commentaire.findByOpportuniteId(req.params.opportunite_id, (err, commentaires) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des commentaires de l'opportunité.");
    }
    res.status(200).json(commentaires);
  });
};

exports.updateCommentaire = (req, res) => {
  const { contenu } = req.body;
  Commentaire.update(req.params.id, { contenu }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la mise à jour du commentaire.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Commentaire non trouvé.");
    }
    res.status(200).send({ message: "Commentaire mis à jour avec succès !" });
  });
};

exports.deleteCommentaire = (req, res) => {
  Commentaire.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du commentaire.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Commentaire non trouvé.");
    }
    res.status(200).send({ message: "Commentaire supprimé avec succès !" });
  });
};
