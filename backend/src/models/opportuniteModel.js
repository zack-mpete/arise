
const db = require("../config/db");

class Opportunite {
  static create(opportunite, callback) {
    const { titre, description, type_opportunite, competences_requises, investisseur_id } = opportunite;
    db.run(
      "INSERT INTO Opportunites (titre, description, type_opportunite, competences_requises, investisseur_id) VALUES (?, ?, ?, ?, ?)",
      [titre, description, type_opportunite, competences_requises, investisseur_id],
      function (err) {
        callback(err, { opportunite_id: this.lastID });
      }
    );
  }

  static getAll(callback) {
    db.all("SELECT * FROM Opportunites", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static findById(id, callback) {
    db.get("SELECT * FROM Opportunites WHERE opportunite_id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static update(id, opportunite, callback) {
    const { titre, description, type_opportunite, competences_requises, statut } = opportunite;
    db.run(
      "UPDATE Opportunites SET titre = ?, description = ?, type_opportunite = ?, competences_requises = ?, statut = ? WHERE opportunite_id = ?",
      [titre, description, type_opportunite, competences_requises, statut, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM Opportunites WHERE opportunite_id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Opportunite;
