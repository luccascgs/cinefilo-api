const { findById } = require("../repositories/users-repository");

const findUserByUserIdService = async (id) => {
  return await findById(id);
};

module.exports = { findUserByUserIdService };
