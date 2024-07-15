const { handleError } = require("../helpers/error-helper");
const {
  findStatsByUserIdService,
} = require("../services/find-stats-by-user-id-service");
const { getScoreboardService } = require("../services/get-scoreboard-service");
const { resetStatsService } = require("../services/reset-stats-service");
const { updateStatsService } = require("../services/update-stats-service");

const findByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await findStatsByUserIdService(id);
    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const getScoreboard = async (req, res) => {
  try {
    const { genre } = req.params;
    const response = await getScoreboardService(genre);
    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const updateStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { genre, value } = req.body;

    const response = await updateStatsService(id, genre, value);

    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const resetStats = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await resetStatsService(id);

    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  findByUserId,
  getScoreboard,
  updateStats,
  resetStats,
};
