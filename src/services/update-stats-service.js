const RegisterNotFoundError = require("../errors/register-not-found-error");
const ValidationError = require("../errors/validation-error");
const { findAllByUserId, update } = require("../repositories/stats-repository");

const updateStatsService = async (id, genre, value) => {
  if (!genre) throw new ValidationError("Gênero");
  const stats = await findAllByUserId(id);
  if (!stats) throw new RegisterNotFoundError();
  const statsId = stats.id;

  const updatedStats = await update(statsId, genre, value);

  return updatedStats;
};

module.exports = { updateStatsService };
