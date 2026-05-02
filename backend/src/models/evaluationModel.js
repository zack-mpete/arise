
const db = require("../config/db");

class Evaluation {
  static create(evaluation, callback) {
    const { score, commentaire, evalue_par_utilisateur_id, utilisateur_evalue_id } = evaluation;
    db.run(
      "INSERT INTO Evaluations (score, commentaire, evalue_par_utilisateur_id, utilisateur_evalue_id) VALUES (?, ?, ?, ?)",
      [score, commentaire, evalue_par_utilisateur_id, utilisateur_evalue_id],
      function (err) {
        callback(err, { evaluation_id: this.lastID });
      }
    );
  }

  static getAll(callback) {
    db.all("SELECT * FROM Evaluations", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static findById(id, callback) {
    db.get("SELECT * FROM Evaluations WHERE evaluation_id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static findByUtilisateurEvalueId(utilisateur_evalue_id, callback) {
    db.all("SELECT * FROM Evaluations WHERE utilisateur_evalue_id = ?", [utilisateur_evalue_id], (err, rows) => {
      callback(err, rows);
    });
  }

  static update(id, evaluation, callback) {
    const { score, commentaire } = evaluation;
    db.run(
      "UPDATE Evaluations SET score = ?, commentaire = ? WHERE evaluation_id = ?",
      [score, commentaire, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM Evaluations WHERE evaluation_id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Evaluation;
