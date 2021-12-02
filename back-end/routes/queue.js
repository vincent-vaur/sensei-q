const router = require("express").Router();
const QueueModel = require("../models/queue");

// Retourne la file d'attente triée par date asc
router.get("/", async (req, res) => {
  try {
    res.send(await QueueModel.findMany());
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

// Insère une nouvelle ligne dans la queue
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    await QueueModel.create(name);
    const createdQueue = await QueueModel.findOneByName(name);
    res.status(201).send(createdQueue);
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

// Supprime une ligne de la queue
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await QueueModel.remove(id);
    res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});

module.exports = router;
