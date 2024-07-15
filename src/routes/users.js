const { Router } = require("express");
const {
  createUser,
  findByUsername,
  updateUsername,
  recoverPassword,
} = require("../controllers/users-controller");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", findByUsername);
usersRouter.put("/password", updateUsername);
usersRouter.put("/username/:id", updateUsername);

// usersRouter.use(authMiddleware);

module.exports = { usersRouter };
