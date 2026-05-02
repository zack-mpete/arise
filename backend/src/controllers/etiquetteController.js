
const Etiquette = require("../models/etiquetteModel");

exports.createEtiquette = (req, res) => {
  const { nom_etiquette } = req.body;
  Etiquette.create(nom_etiquette, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la création de l'étiquette.");
    }
    res.status(201).send({ message: "Étiquette créée avec succès !", etiquette_id: result.etiquette_id });
  });
};

exports.getEtiquettes = (req, res) => {
  Etiquette.getAll((err, etiquettes) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des étiquettes.");
    }
    res.status(200).json(etiquettes);
  });
};

exports.addEtiquetteToProjet = (req, res) => {
  const { projet_id, etiquette_id } = req.body;
  Etiquette.addEtiquetteToProjet(projet_id, etiquette_id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'ajout de l'étiquette au projet.");
    }
    res.status(200).send({ message: "Étiquette ajoutée au projet avec succès !" });
  });
};

exports.addEtiquetteToOpportunite = (req, res) => {
  const { opportunite_id, etiquette_id } = req.body;
  Etiquette.addEtiquetteToOpportunite(opportunite_id, etiquette_id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'ajout de l'étiquette à l'opportunité.");
    }
    res.status(200).send({ message: "Étiquette ajoutée à l'opportunité avec succès !" });
  });
};

exports.getEtiquettesByProjet = (req, res) => {
  Etiquette.getEtiquettesByProjet(req.params.projet_id, (err, etiquettes) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des étiquettes du projet.");
    }
    res.status(200).json(etiquettes);
  });
};

exports.getEtiquettesByOpportunite = (req, res) => {
  Etiquette.getEtiquettesByOpportunite(req.params.opportunite_id, (err, etiquettes) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des étiquettes de l'opportunité.");
    }
    res.status(200).json(etiquettes);
  });
};
