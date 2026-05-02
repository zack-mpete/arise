
const app = require("./src/app");
const db = require("./src/config/db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}.`);
});
