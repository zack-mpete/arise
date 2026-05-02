
const db = require("../config/db");

class Projet {
  static create(projet, callback) {
    const { titre, description, entrepreneur_id } = projet;
    db.run(
      "INSERT INTO Projets (titre, description, entrepreneur_id) VALUES (?, ?, ?)",
      [titre, description, entrepreneur_id],
      function (err) {
        callback(err, { projet_id: this.lastID });
      }
    );
  }

  static getAll(callback) {
    db.all(`
      SELECT p.*, COUNT(f.utilisateur_id) as likes
      FROM Projets p
      LEFT JOIN Favoris f ON p.projet_id = f.projet_id
      GROUP BY p.projet_id
    `, [], (err, rows) => {
      callback(err, rows);
    });
  }

  static findByEntrepreneur(entrepreneur_id, callback) {
    db.all("SELECT * FROM Projets WHERE entrepreneur_id = ?", [entrepreneur_id], (err, rows) => {
      callback(err, rows);
    });
  }

  static findById(id, callback) {

    db.get("SELECT * FROM Projets WHERE projet_id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static update(id, projet, callback) {
    const { titre, description, statut, certificat_pi, date_validation_ia, date_validation_admin } = projet;
    db.run(
      "UPDATE Projets SET titre = ?, description = ?, statut = ?, certificat_pi = ?, date_validation_ia = ?, date_validation_admin = ? WHERE projet_id = ?",
      [titre, description, statut, certificat_pi, date_validation_ia, date_validation_admin, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static toggleArchive(id, est_archive, callback) {
    db.run(
      "UPDATE Projets SET est_archive = ? WHERE projet_id = ?",
      [est_archive, id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM Projets WHERE projet_id = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Projet;
