const router = require("express").Router();
const UserModel = require("../models/user");

router.get("/", async (req, res) => {
  try {
    res.send(await UserModel.findMany());
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

router.post("/", async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    await UserModel.create(username, email, password, avatar);
    res.status(201).send('Created');
  } catch (e) {
    if (Array.isArray(e)) {
      res.status(400).send(e);
    } else {
      res.status(500).send("Unexpected error");
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, avatar } = req.body;

  try {
    await UserModel.update(id, username, email, avatar);
    res.status(204).send('Updated');
  } catch (e) {
    if (Array.isArray(e)) {
      res.status(400).send(e);
    } else {
      res.status(500).send("Unexpected error");
    }
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await UserModel.remove(id);
    res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

module.exports = router;
