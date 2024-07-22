const { Router } = require("express");
const {
  createUser,
  findByUsername,
  updateUsername,
  recoverPassword,
  findById,
  updateIcon,
  updateTries,
} = require("../controllers/users-controller");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", findByUsername);
usersRouter.get("/:id", findById);
usersRouter.put("/tries/:id", updateTries);
usersRouter.put("/recover", recoverPassword);
usersRouter.put("/username/:id", updateUsername);
usersRouter.put("/icon/:id", updateIcon);

// usersRouter.use(authMiddleware);

module.exports = { usersRouter };
