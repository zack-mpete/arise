
const db = require("../config/db");

class Commentaire {
  static create(commentaire, callback) {
    const { contenu, utilisateur_id, projet_id, opportunite_id } = commentaire;
    db.run(
      "INSERT INTO Commentaires (contenu, utilisateur_id, projet_id, opportunite_id) VALUES (?, ?, ?, ?)",
      [contenu, utilisateur_id, projet_id, opportunite_id],
      function (err) {
        callback(err, { commentaire_id: this.lastID });
      }
    );
  }

  static getAll(callback) {
    db.all("SELECT * FROM Commentaires", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static findById(id, callback) {
    db.get("SELECT * FROM Commentaires WHERE commentaire_id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static findByProjetId(projet_id, callback) {
    db.all("SELECT * FROM Commentaires WHERE projet_id = ?", [projet_id], (err, rows) => {
      callback(err, rows);
    });
  }

  static findByOpportuniteId(opportunite_id, callback) {
    db.all("SELECT * FROM Commentaires WHERE opportunite_id = ?", [opportunite_id], (err, rows) => {
      callback(err, rows);
    });
  }

  static update(id, commentaire, callback) {
    const { contenu } = commentaire;
    db.run(
      "UPDATE Commentaires SET contenu = ? WHERE commentaire_id = ?",
      [contenu, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM Commentaires WHERE commentaire_id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Commentaire;
