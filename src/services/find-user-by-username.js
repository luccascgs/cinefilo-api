const { findByUsername } = require("../repositories/users-repository");

const findUserByUsernameService = async (id) => {
  return await findByUsername(id);
};

module.exports = { findUserByUsernameService };
