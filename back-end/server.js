// Charge les variables du fichier .env s'il existe
require("dotenv").config();

const session = require("express-session");
const cors = require("cors");
const express = require("express");
const { setupRoutes } = require("./routes");

const app = express();
const port = 3001;

// Gestion des CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Gestion des sessions
app.use(session({
  name: 'sensei-q-sid',
  secret: "mlskjflkdsmf@sldkjflskj===sdflksjf",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60,
  }
}))

// Permet de récupérer le body sur les requêtes POST / PUT
app.use(express.json());

// Routes de l'application
setupRoutes(app);

app.listen(port, () => {
  console.log(`Sensei Q is listening at http://localhost:${port}`);
});
