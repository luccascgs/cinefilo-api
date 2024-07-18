const { Router } = require("express");
const { authRouter } = require("./auth");
const { moviesRouter } = require("./movies");
const { usersRouter } = require("./users");
const { statsRouter } = require("./stats");
const { iconsRouter } = require("./icons");

const routes = Router();

routes.use(authRouter);
routes.use("/movies", moviesRouter);
routes.use("/users", usersRouter);
routes.use("/stats", statsRouter);
routes.use("/icons", iconsRouter);

module.exports = { routes };
