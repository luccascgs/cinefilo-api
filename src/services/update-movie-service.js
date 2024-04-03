const RegisterNotFoundError = require("../errors/register-not-found-error");
const ValidationError = require("../errors/validation-error");
const { findById, update } = require("../repositories/movies-repository");

const updateMovieService = async (name, acceptableNames, emojis, genre, id) => {
  if (!name) throw new ValidationError("Nome");
  if (!acceptableNames) throw new ValidationError("Nomes permitidos");
  if (!emojis) throw new ValidationError("Emojis");
  if (!genre) throw new ValidationError("Gênero");

  const movie = await findById(id);
  if (!movie) throw new RegisterNotFoundError();

  const updatedMovie = await update({
    id,
    name,
    acceptableNames,
    emojis,
    genre,
  });

  return updatedMovie;
};

module.exports = { updateMovieService };
