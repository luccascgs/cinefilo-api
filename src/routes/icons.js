const { Router } = require("express");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");
const { listAllIcons } = require("../controllers/icons-controller");

const iconsRouter = Router();

iconsRouter.get("/:folder", listAllIcons);

// usersRouter.use(authMiddleware);

module.exports = { iconsRouter };
