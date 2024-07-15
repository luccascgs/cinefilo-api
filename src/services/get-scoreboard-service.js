const { getScoreboard } = require("../repositories/stats-repository");

const getScoreboardService = async (genre) => {
  return await getScoreboard(genre);
};

module.exports = { getScoreboardService };
