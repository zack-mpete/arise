
const db = require("../config/db");

class Etiquette {
  static create(nom_etiquette, callback) {
    db.run(
      "INSERT INTO Etiquettes (nom_etiquette) VALUES (?)",
      [nom_etiquette],
      function (err) {
        callback(err, { etiquette_id: this.lastID });
      }
    );
  }

  static findById(id, callback) {
    db.get("SELECT * FROM Etiquettes WHERE etiquette_id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static findByName(nom_etiquette, callback) {
    db.get("SELECT * FROM Etiquettes WHERE nom_etiquette = ?", [nom_etiquette], (err, row) => {
      callback(err, row);
    });
  }

  static getAll(callback) {
    db.all("SELECT * FROM Etiquettes", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static addEtiquetteToProjet(projet_id, etiquette_id, callback) {
    db.run(
      "INSERT INTO Projets_Etiquettes (projet_id, etiquette_id) VALUES (?, ?)",
      [projet_id, etiquette_id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static addEtiquetteToOpportunite(opportunite_id, etiquette_id, callback) {
    db.run(
      "INSERT INTO Opportunites_Etiquettes (opportunite_id, etiquette_id) VALUES (?, ?)",
      [opportunite_id, etiquette_id],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  }

  static getEtiquettesByProjet(projet_id, callback) {
    db.all(
      "SELECT E.etiquette_id, E.nom_etiquette FROM Etiquettes E JOIN Projets_Etiquettes PE ON E.etiquette_id = PE.etiquette_id WHERE PE.projet_id = ?",
      [projet_id],
      (err, rows) => {
        callback(err, rows);
      }
    );
  }

  static getEtiquettesByOpportunite(opportunite_id, callback) {
    db.all(
      "SELECT E.etiquette_id, E.nom_etiquette FROM Etiquettes E JOIN Opportunites_Etiquettes OE ON E.etiquette_id = OE.etiquette_id WHERE OE.opportunite_id = ?",
      [opportunite_id],
      (err, rows) => {
        callback(err, rows);
      }
    );
  }
}

module.exports = Etiquette;
