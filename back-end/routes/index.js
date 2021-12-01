const queueRouter = require("./queue");

// Définir les routes de l'application
const setupRoutes = (app) => {
  app.use("/queue", queueRouter);
};

module.exports = {
  setupRoutes,
};
