const { Router } = require("express");
const {
  createMovie,
  updateMovie,
  findAllMovies,
} = require("../controllers/movies-controller");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");

const moviesRouter = Router();

moviesRouter.get("/", findAllMovies);

moviesRouter.use(authMiddleware);

moviesRouter.post("/", createMovie);
moviesRouter.put("/:id", updateMovie);

module.exports = { moviesRouter };
