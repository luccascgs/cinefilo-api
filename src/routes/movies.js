const { Router } = require("express");
const {
  createMovie,
  updateMovie,
  findAllMovies,
  findDailyMovie,
  findByGenre,
} = require("../controllers/movies-controller");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");

const moviesRouter = Router();

moviesRouter.get("/", findAllMovies);
moviesRouter.get("/daily", findDailyMovie);
moviesRouter.get("/genres", findByGenre);

moviesRouter.use(authMiddleware);

moviesRouter.post("/", createMovie);
moviesRouter.put("/:id", updateMovie);

module.exports = { moviesRouter };
