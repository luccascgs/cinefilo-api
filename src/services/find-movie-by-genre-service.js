const { sortNumber } = require("../helpers/number-helper");
const { findAll, findByGenre } = require("../repositories/movies-repository");

const findMovieByGenreService = async (genre) => {
  let movies = [];

  if (genre) {
    movies = await findByGenre(genre);
  } else {
    movies = await findAll();
  }

  const randomIndex = sortNumber(movies.length);
  return movies[randomIndex];
};

module.exports = { findMovieByGenreService };
