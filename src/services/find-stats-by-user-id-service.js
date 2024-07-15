const { findAllByUserId } = require("../repositories/stats-repository");

const findStatsByUserIdService = async (id) => {
  return await findAllByUserId(id);
};

module.exports = { findStatsByUserIdService };
