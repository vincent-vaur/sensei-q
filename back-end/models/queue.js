const db = require("../services/db");

/**
 * Retourne toutes les entrées de la file d'attente
 */
const findMany = async () => {
  const [queue] = await db.query("SELECT * FROM queue ORDER BY created");
  return queue;
};

/**
 * Retourne une entrée de la file par son nom
 */
const findOneByName = async (name) => {
  const [result] = await db.query("SELECT * FROM queue WHERE name = ?", [
    name,
  ]);

  return result[0];
}

/**
 * Ajoute une entrée à la file d'attente
 */
const create = async (name) => {
  await db.query("INSERT INTO queue (name) VALUES (?)", [name]);
};

/**
 * Supprime une entrée de la file d'attente
 */
const remove = async (id) => {
  await db.query("DELETE FROM queue WHERE id = ?", [id]);
};

module.exports = {
  findMany,
  findOneByName,
  create,
  remove,
};
