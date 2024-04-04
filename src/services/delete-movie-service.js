const RegisterNotFoundError = require("../errors/register-not-found-error");
const { deleteMovie, findById } = require("../repositories/movies-repository");

const deleteMovieService = async (id) => {
  const movie = await findById(id);
  if (!movie) throw new RegisterNotFoundError();

  await deleteMovie(id);
};

module.exports = { deleteMovieService };
