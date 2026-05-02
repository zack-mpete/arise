const express = require("express");
const router = express.Router();
const commentaireController = require("../controllers/commentaireController");

router.post("/", commentaireController.createCommentaire);
router.get("/", commentaireController.getCommentaires);
router.get("/:id", commentaireController.getCommentaireById);
router.get("/projet/:projet_id", commentaireController.getCommentairesByProjetId);
router.get("/opportunite/:opportunite_id", commentaireController.getCommentairesByOpportuniteId);
router.put("/:id", commentaireController.updateCommentaire);
router.delete("/:id", commentaireController.deleteCommentaire);

module.exports = router;
