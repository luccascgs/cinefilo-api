const { Router } = require("express");
const {
  createUser,
  findByUsername,
  updateUsername,
  recoverPassword,
  findById,
  updateIcon,
} = require("../controllers/users-controller");
const {
  authMiddleware,
} = require("../controllers/middlewares/auth-middleware");

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", findByUsername);
usersRouter.get("/:id", findById);
usersRouter.put("/recover", recoverPassword);
usersRouter.put("/username/:id", updateUsername);
usersRouter.put("/icon/:id", updateIcon);

// usersRouter.use(authMiddleware);

module.exports = { usersRouter };
