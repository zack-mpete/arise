
const express = require("express");
const router = express.Router();
const opportuniteController = require("../controllers/opportuniteController");

router.post("/", opportuniteController.createOpportunite);
router.get("/", opportuniteController.getOpportunites);
router.get("/:id", opportuniteController.getOpportuniteById);
router.put("/:id", opportuniteController.updateOpportunite);
router.delete("/:id", opportuniteController.deleteOpportunite);

module.exports = router;
