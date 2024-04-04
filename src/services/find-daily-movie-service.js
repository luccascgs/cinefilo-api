const RegisterNotFoundError = require("../errors/register-not-found-error");
const { format } = require("../helpers/date-helper");
const { sortNumber } = require("../helpers/number-helper");
const { findByDay, create } = require("../repositories/days-repository");
const { findAll, findById } = require("../repositories/movies-repository");

const findDailyMovieService = async () => {
  const today = format(new Date());
  const dailyMovie = await findByDay(today);
  let currentDailyMovie;

  if (dailyMovie) {
    currentDailyMovie = dailyMovie;
  } else {
    const allMovies = await findAll();
    const randomIndex = sortNumber(allMovies.length);
    const newDailyMovie = allMovies[randomIndex];

    currentDailyMovie = await create({
      day: today,
      id_movie: newDailyMovie.id,
    });
  }

  const movie = await findById(currentDailyMovie.id_movie);
  if (!movie) throw new RegisterNotFoundError();

  return movie;
};

module.exports = { findDailyMovieService };
