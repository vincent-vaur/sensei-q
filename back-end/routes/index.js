const authMiddleware = require("../services/authMiddleware");
const queueRouter = require("./queue");
const userRouter = require("./user");

// Définir les routes de l'application
const setupRoutes = (app) => {
  app.use("/queue", authMiddleware, queueRouter);
  app.use("/users", userRouter);
};

module.exports = {
  setupRoutes,
};
