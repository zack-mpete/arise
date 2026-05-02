const express = require("express");
const router = express.Router();
const evaluationController = require("../controllers/evaluationController");

router.post("/", evaluationController.createEvaluation);
router.get("/", evaluationController.getEvaluations);
router.get("/:id", evaluationController.getEvaluationById);
router.get("/utilisateur/:utilisateur_evalue_id", evaluationController.getEvaluationsByUtilisateurEvalueId);
router.put("/:id", evaluationController.updateEvaluation);
router.delete("/:id", evaluationController.deleteEvaluation);

module.exports = router;
