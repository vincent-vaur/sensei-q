const queueRouter = require("./queue");
const userRouter = require("./user");

// Définir les routes de l'application
const setupRoutes = (app) => {
  app.use("/queue", queueRouter);
  app.use("/users", userRouter);
};

module.exports = {
  setupRoutes,
};
