const db = require("../services/db");
const Joi = require("joi");

const schema = require("./user.schema");

/**
 * Retourne un utilisateur par son email
 */
const findOneByEmail = async (email) => {
  const [[user]] = await db.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);

  return user;
};

/**
 * Retourne tous les utilisateurs
 */
const findMany = async () => {
  const [users] = await db.query("SELECT * FROM user ORDER BY created");
  return users;
};

/**
 * Ajoute un utilisateur
 */
const create = async (username, email, password, avatar) => {
  const { error } = schema.validate(
    { username, email, password, avatar },
    { abortEarly: false }
  );

  if (error) {
    throw error.details;
  }

  await db.query(
    "INSERT INTO user (username, email, password, avatar, lastConnexion) VALUES (?, ?, ?, ?, ?)",
    [username, email, password, avatar, new Date()]
  );
};

/**
 * Met à jour un utilisateur
 */
const update = async (id, username, email, avatar) => {
  // const { error } = schema.validate(
  //   { username, email, avatar },
  //   { abortEarly: false }
  // );

  // if (error) {
  //   throw error.details;
  // }

  await db.query(
    "UPDATE user SET username = ?, email = ?, avatar = ? WHERE id = ?",
    [username, email, avatar, id]
  );
};

/**
 * Supprime un utilisateur
 */
const remove = async (id) => {
  await db.query("DELETE FROM user WHERE id = ?", [id]);
};

module.exports = {
  findOneByEmail,
  findMany,
  create,
  update,
  remove,
};
