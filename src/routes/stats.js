const { Router } = require("express");
const {
  findByUserId,
  getScoreboard,
  updateStats,
  resetStats,
} = require("../controllers/stats-controller");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");

const statsRouter = Router();

statsRouter.get("/:id", findByUserId);
statsRouter.get("/scoreboard/:genre", getScoreboard);
statsRouter.put("/:id", updateStats);
statsRouter.put("/:id", resetStats);

// usersRouter.use(authMiddleware);

module.exports = { statsRouter };
