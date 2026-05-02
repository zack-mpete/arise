const express = require("express");
const router = express.Router();
const etiquetteController = require("../controllers/etiquetteController");

router.post("/", etiquetteController.createEtiquette);
router.get("/", etiquetteController.getEtiquettes);
router.post("/projet", etiquetteController.addEtiquetteToProjet);
router.post("/opportunite", etiquetteController.addEtiquetteToOpportunite);
router.get("/projet/:projet_id", etiquetteController.getEtiquettesByProjet);
router.get("/opportunite/:opportunite_id", etiquetteController.getEtiquettesByOpportunite);

module.exports = router;
