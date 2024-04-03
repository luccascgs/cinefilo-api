const { Router } = require("express");
const { authRouter } = require("./auth");
const { moviesRouter } = require("./movies");

const routes = Router();

routes.use(authRouter);
routes.use("/movies", moviesRouter);

module.exports = { routes };
