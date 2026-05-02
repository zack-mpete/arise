
const db = require("../config/db");

class Signalement {
  static create(signalement, callback) {
    const { raison, utilisateur_signalant_id, projet_signale_id, commentaire_signale_id } = signalement;
    db.run(
      "INSERT INTO Signalements (raison, utilisateur_signalant_id, projet_signale_id, commentaire_signale_id) VALUES (?, ?, ?, ?)",
      [raison, utilisateur_signalant_id, projet_signale_id, commentaire_signale_id],
      function (err) {
        callback(err, { signalement_id: this.lastID });
      }
    );
  }

  static getAll(callback) {
    db.all("SELECT * FROM Signalements", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static findById(id, callback) {
    db.get("SELECT * FROM Signalements WHERE signalement_id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static update(id, signalement, callback) {
    const { raison, statut, administrateur_id } = signalement;
    db.run(
      "UPDATE Signalements SET raison = ?, statut = ?, administrateur_id = ? WHERE signalement_id = ?",
      [raison, statut, administrateur_id, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM Signalements WHERE signalement_id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Signalement;
