
const Projet = require("../models/projetModel");

exports.createProjet = (req, res) => {
  const { titre, description, entrepreneur_id } = req.body;
  Projet.create({ titre, description, entrepreneur_id }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la création du projet.");
    }
    res.status(201).send({ message: "Projet créé avec succès !", projet_id: result.projet_id });
  });
};

exports.getProjets = (req, res) => {
  const { entrepreneur_id } = req.query;

  if (entrepreneur_id) {
    Projet.findByEntrepreneur(entrepreneur_id, (err, projets) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la récupération des projets.");
      }
      res.status(200).json(projets);
    });
  } else {
    Projet.getAll((err, projets) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la récupération des projets.");
      }
      res.status(200).json(projets);
    });
  }
};


exports.getProjetById = (req, res) => {
  Projet.findById(req.params.id, (err, projet) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération du projet.");
    }
    if (!projet) {
      return res.status(404).send("Projet non trouvé.");
    }
    res.status(200).json(projet);
  });
};

exports.updateProjet = (req, res) => {
  const { titre, description, statut, certificat_pi, date_validation_ia, date_validation_admin } = req.body;
  Projet.update(
    req.params.id,
    { titre, description, statut, certificat_pi, date_validation_ia, date_validation_admin },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la mise à jour du projet.");
      }
      if (result.changes === 0) {
        return res.status(404).send("Projet non trouvé.");
      }
      res.status(200).send({ message: "Projet mis à jour avec succès !" });
    }
  );
};

exports.deleteProjet = (req, res) => {
  Projet.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du projet.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Projet non trouvé.");
    }
    res.status(200).send({ message: "Projet supprimé avec succès !" });
  });
};

exports.archiveProjet = (req, res) => {
  const { est_archive } = req.body;
  const { id } = req.params;

  Projet.toggleArchive(id, est_archive, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'archivage du projet.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Projet non trouvé.");
    }
    res.status(200).send({ 
      message: est_archive ? "Projet archivé avec succès !" : "Projet désarchivé avec succès !",
      est_archive 
    });
  });
};
