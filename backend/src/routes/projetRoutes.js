
const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");
const favoriController = require("../controllers/favoriController");

router.post("/", projetController.createProjet);
router.post("/:id/favori", favoriController.toggleFavori);
router.get("/", projetController.getProjets);
router.get("/:id", projetController.getProjetById);
router.put("/:id", projetController.updateProjet);
router.put("/:id/archive", projetController.archiveProjet);
router.delete("/:id", projetController.deleteProjet);

module.exports = router;
