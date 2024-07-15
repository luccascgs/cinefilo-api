const RegisterNotFoundError = require("../errors/register-not-found-error");
const ValidationError = require("../errors/validation-error");
const { findAllByUserId, reset } = require("../repositories/stats-repository");

const resetStatsService = async (id) => {
  const stats = await findAllByUserId(id);
  if (!stats) throw new RegisterNotFoundError();
  const statsId = stats.id;

  const updatedStats = await reset(statsId);

  return updatedStats;
};

module.exports = { resetStatsService };
