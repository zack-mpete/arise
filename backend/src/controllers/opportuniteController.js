
const Opportunite = require("../models/opportuniteModel");

exports.createOpportunite = (req, res) => {
  const { titre, description, type_opportunite, competences_requises, investisseur_id } = req.body;
  Opportunite.create({ titre, description, type_opportunite, competences_requises, investisseur_id }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la création de l'opportunité.");
    }
    res.status(201).send({ message: "Opportunité créée avec succès !", opportunite_id: result.opportunite_id });
  });
};

exports.getOpportunites = (req, res) => {
  Opportunite.getAll((err, opportunites) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des opportunités.");
    }
    res.status(200).json(opportunites);
  });
};

exports.getOpportuniteById = (req, res) => {
  Opportunite.findById(req.params.id, (err, opportunite) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération de l'opportunité.");
    }
    if (!opportunite) {
      return res.status(404).send("Opportunité non trouvée.");
    }
    res.status(200).json(opportunite);
  });
};

exports.updateOpportunite = (req, res) => {
  const { titre, description, type_opportunite, competences_requises, statut } = req.body;
  Opportunite.update(
    req.params.id,
    { titre, description, type_opportunite, competences_requises, statut },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la mise à jour de l'opportunité.");
      }
      if (result.changes === 0) {
        return res.status(404).send("Opportunité non trouvée.");
      }
      res.status(200).send({ message: "Opportunité mise à jour avec succès !" });
    }
  );
};

exports.deleteOpportunite = (req, res) => {
  Opportunite.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression de l'opportunité.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Opportunité non trouvée.");
    }
    res.status(200).send({ message: "Opportunité supprimée avec succès !" });
  });
};
