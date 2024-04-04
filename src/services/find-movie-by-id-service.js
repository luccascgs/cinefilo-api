const { findById } = require("../repositories/movies-repository");

const findMovieByIdService = async (id) => {
  return await findById(id);
};

module.exports = { findMovieByIdService };
