const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
const port = 3001;

// Charge les variables du fichier .env s'il existe
dotenv.config();

// Gestion des CORS
app.use(cors());

// Permet de récupérer le body sur les requêtes POST / PUT
app.use(express.json());

// Connexion à la BDD
const db = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("DOCUMENTATION ICI ?");
});

// Retourne la file d'attente triée par date asc
app.get("/queue", async (req, res) => {
  try {
    const [queue] = await db.query("SELECT * FROM queue ORDER BY created");
    res.send(queue);
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

// Insère une nouvelle ligne dans la queue
app.post("/queue", async (req, res) => {
  const { name } = req.body;

  try {
    await db.query("INSERT INTO queue (name) VALUES (?)", [name]);
    const [result] = await db.query("SELECT * FROM queue WHERE name = ?", [
      name,
    ]);

    res.status(201).send(result[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

// Supprime une ligne de la queue
app.delete("/queue/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM queue WHERE id = ?", [id]);
    res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

app.listen(port, () => {
  console.log(`Sensei Q is listening at http://localhost:${port}`);
});
