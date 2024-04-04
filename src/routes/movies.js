const { Router } = require("express");
const {
  createMovie,
  updateMovie,
  findAllMovies,
  findDailyMovie,
  findByGenre,
  findById,
  deleteMovie,
} = require("../controllers/movies-controller");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");

const moviesRouter = Router();

moviesRouter.get("/", findAllMovies);
moviesRouter.get("/daily", findDailyMovie);
moviesRouter.get("/genres", findByGenre);
moviesRouter.get("/:id", findById);

moviesRouter.use(authMiddleware);

moviesRouter.post("/", createMovie);
moviesRouter.put("/:id", updateMovie);
moviesRouter.delete("/:id", deleteMovie);

module.exports = { moviesRouter };
