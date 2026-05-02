
const db = require("../config/db");

class Utilisateur {
  static create(utilisateur, callback) {
    const { nom_utilisateur, email, mot_de_passe_hash, role } = utilisateur;
    db.run(
      "INSERT INTO Utilisateurs (nom_utilisateur, email, mot_de_passe_hash, role) VALUES (?, ?, ?, ?)",
      [nom_utilisateur, email, mot_de_passe_hash, role],
      function (err) {
        callback(err, { utilisateur_id: this.lastID });
      }
    );
  }

  static findByEmail(email, callback) {
    db.get("SELECT * FROM Utilisateurs WHERE email = ?", [email], (err, row) => {
      callback(err, row);
    });
  }

  static findById(id, callback) {
    db.get("SELECT * FROM Utilisateurs WHERE utilisateur_id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static getAll(callback) {
    db.all("SELECT * FROM Utilisateurs", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static update(id, utilisateur, callback) {
    const { nom_utilisateur, email, mot_de_passe_hash, role, score_confiance } = utilisateur;
    db.run(
      "UPDATE Utilisateurs SET nom_utilisateur = ?, email = ?, mot_de_passe_hash = ?, role = ?, score_confiance = ? WHERE utilisateur_id = ?",
      [nom_utilisateur, email, mot_de_passe_hash, role, score_confiance, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM Utilisateurs WHERE utilisateur_id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Utilisateur;
