const ValidationError = require("../errors/validation-error");
const { create } = require("../repositories/movies-repository");

const createMovieService = async (name, acceptableNames, emojis, genre) => {
  if (!name) throw new ValidationError("Nome");
  if (!acceptableNames) throw new ValidationError("Nomes permitidos");
  if (!emojis) throw new ValidationError("Emojis");
  if (!genre) throw new ValidationError("Gênero");

  return await create({ name, acceptableNames, emojis, genre });
};

module.exports = { createMovieService };
