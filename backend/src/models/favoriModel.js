const db = require("../config/db");

class Favori {
  static toggle(utilisateur_id, projet_id, callback) {
    // Vérifier si le favori existe déjà
    db.get(
      "SELECT * FROM Favoris WHERE utilisateur_id = ? AND projet_id = ?",
      [utilisateur_id, projet_id],
      (err, row) => {
        if (err) return callback(err);

        if (row) {
          // Supprimer le favori s'il existe
          db.run(
            "DELETE FROM Favoris WHERE utilisateur_id = ? AND projet_id = ?",
            [utilisateur_id, projet_id],
            function (err) {
              callback(err, { isFavorite: false, message: "Favori retiré" });
            }
          );
        } else {
          // Ajouter le favori s'il n'existe pas
          db.run(
            "INSERT INTO Favoris (utilisateur_id, projet_id) VALUES (?, ?)",
            [utilisateur_id, projet_id],
            function (err) {
              callback(err, { isFavorite: true, message: "Favori ajouté" });
            }
          );
        }
      }
    );
  }
}

module.exports = Favori;
