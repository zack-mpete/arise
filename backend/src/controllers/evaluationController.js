
const Evaluation = require("../models/evaluationModel");

exports.createEvaluation = (req, res) => {
  const { score, commentaire, evalue_par_utilisateur_id, utilisateur_evalue_id } = req.body;
  Evaluation.create({ score, commentaire, evalue_par_utilisateur_id, utilisateur_evalue_id }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la création de l'évaluation.");
    }
    res.status(201).send({ message: "Évaluation créée avec succès !", evaluation_id: result.evaluation_id });
  });
};

exports.getEvaluations = (req, res) => {
  Evaluation.getAll((err, evaluations) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des évaluations.");
    }
    res.status(200).json(evaluations);
  });
};

exports.getEvaluationById = (req, res) => {
  Evaluation.findById(req.params.id, (err, evaluation) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération de l'évaluation.");
    }
    if (!evaluation) {
      return res.status(404).send("Évaluation non trouvée.");
    }
    res.status(200).json(evaluation);
  });
};

exports.getEvaluationsByUtilisateurEvalueId = (req, res) => {
  Evaluation.findByUtilisateurEvalueId(req.params.utilisateur_evalue_id, (err, evaluations) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des évaluations de l'utilisateur.");
    }
    res.status(200).json(evaluations);
  });
};

exports.updateEvaluation = (req, res) => {
  const { score, commentaire } = req.body;
  Evaluation.update(req.params.id, { score, commentaire }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la mise à jour de l'évaluation.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Évaluation non trouvée.");
    }
    res.status(200).send({ message: "Évaluation mise à jour avec succès !" });
  });
};

exports.deleteEvaluation = (req, res) => {
  Evaluation.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression de l'évaluation.");
    }
    if (result.changes === 0) {
      return res.status(404).send("Évaluation non trouvée.");
    }
    res.status(200).send({ message: "Évaluation supprimée avec succès !" });
  });
};
