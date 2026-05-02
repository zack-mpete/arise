const Favori = require("../models/favoriModel");

exports.toggleFavori = (req, res) => {
  // Pour le test, on va simuler un utilisateur si req.user n'est pas défini
  // Dans un vrai système, req.user.utilisateur_id serait défini par le middleware d'authentification
  const utilisateur_id = req.user ? req.user.utilisateur_id : (req.body.utilisateur_id || 1);
  const projet_id = req.params.id;

  if (!projet_id) {
    return res.status(400).send({ message: "ID du projet manquant." });
  }

  Favori.toggle(utilisateur_id, projet_id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la modification des favoris.");
    }
    res.status(200).json(result);
  });
};
