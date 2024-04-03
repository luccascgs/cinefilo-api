const { format } = require("../helpers/date-helper");
const { sortNumber } = require("../helpers/number-helper");
const { findByDay, create } = require("../repositories/days-repository");
const { findAll } = require("../repositories/movies-repository");

const findDailyMovieService = async () => {
  const today = format(new Date());
  const dailyMovie = await findByDay(today);

  if (dailyMovie) {
    return dailyMovie;
  }

  const allMovies = await findAll();
  const randomIndex = sortNumber(allMovies.length);
  const newDailyMovie = allMovies[randomIndex];

  return await create({ day: today, id_movie: newDailyMovie.id });
};

module.exports = { findDailyMovieService };
