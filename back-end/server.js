// Charge les variables du fichier .env s'il existe
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { setupRoutes } = require("./routes");

const app = express();
const port = 3001;

// Gestion des CORS
app.use(cors());

// Permet de récupérer le body sur les requêtes POST / PUT
app.use(express.json());

// Routes de l'application
setupRoutes(app);

app.listen(port, () => {
  console.log(`Sensei Q is listening at http://localhost:${port}`);
});
