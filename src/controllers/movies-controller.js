const { handleError } = require("../helpers/error-helper");
const { createMovieService } = require("../services/create-movie-service");
const { findAllMoviesService } = require("../services/find-all-movies-service");
const {
  findDailyMovieService,
} = require("../services/find-daily-movie-service");
const {
  findMovieByGenreService,
} = require("../services/find-movie-by-genre-service");
const { updateMovieService } = require("../services/update-movie-service");

const createMovie = async (req, res) => {
  try {
    const { name, acceptableNames, emojis, genre } = req.body;

    const response = await createMovieService(
      name,
      acceptableNames,
      emojis,
      genre
    );

    res.status(201).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, acceptableNames, emojis, genre } = req.body;

    const response = await updateMovieService(
      name,
      acceptableNames,
      emojis,
      genre,
      id
    );

    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const findAllMovies = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await findAllMoviesService(name);
    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const findByGenre = async (req, res) => {
  try {
    const { filter } = req.query;
    const response = await findMovieByGenreService(filter);
    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const findDailyMovie = async (req, res) => {
  try {
    const response = await findDailyMovieService();
    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  createMovie,
  updateMovie,
  findAllMovies,
  findDailyMovie,
  findByGenre,
};
