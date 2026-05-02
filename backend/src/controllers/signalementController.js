
const Signalement = require("../models/signalementModel");

exports.createSignalement = (req, res) => {
  const { raison, utilisateur_signalant_id, projet_signale_id, commentaire_signale_id } = req.body;
  Signalement.create({ raison, utilisateur_signalant_id, projet_signale_id, commentaire_signale_id }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la création du signalement.");
    }
    res.status(201).send({ message: "Signalement créé avec succès !", signalement_id: result.signalement_id });
  });
};

exports.getSignalements = (req, res) => {
  Signalement.getAll((err, signalements) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des signalements.");
    }
    res.status(200).json(signalements);
  });
};

exports.getSignalementById = (req, res) => {
  Signalement.findById(req.params.id, (err, signalement) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération du signalement.");
    }
    if (!signalement) {
      return res.status(404).send("Signalement non trouvé.");
    }
    res.status(200).json(signalement);
  });
};

exports.updateSignalement = (req, res) => {
  const { raison, statut, administrateur_id } = req.body;
  Signalement.update(
    req.params.id,
    { raison, statut, administrateur_id },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la mise à jour du signalement.");
      }
      if (result.changes === 0) {
        return res.status(404).send("Signalement non trouvé.");
      }
      res.status(200).send({ message: "Signalement mis à jour avec succès !" });
    }
  );
};

exports.deleteSignalement = (req, res) => {
  Signalement.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du signalement.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Signalement non trouvé.");
    }
    res.status(200).send({ message: "Signalement supprimé avec succès !" });
  });
};
