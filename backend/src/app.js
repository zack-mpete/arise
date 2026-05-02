
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const projetRoutes = require("./routes/projetRoutes");
const opportuniteRoutes = require("./routes/opportuniteRoutes");
const commentaireRoutes = require("./routes/commentaireRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const signalementRoutes = require("./routes/signalementRoutes");
const etiquetteRoutes = require("./routes/etiquetteRoutes");

app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/projets", projetRoutes);
app.use("/api/opportunites", opportuniteRoutes);
app.use("/api/commentaires", commentaireRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/signalements", signalementRoutes);
app.use("/api/etiquettes", etiquetteRoutes);

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API de la Plateforme d'Innovation." });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " non trouvé" });
});

module.exports = app;
