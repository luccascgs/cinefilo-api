const { findAll } = require("../repositories/movies-repository");

const findAllMoviesService = async () => {
  return await findAll();
};

module.exports = { findAllMoviesService };
