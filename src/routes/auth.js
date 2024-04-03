const { Router } = require("express");
const { signIn } = require("../controllers/auth-controller");

const authRouter = Router();

authRouter.post("/sign-in", signIn);

module.exports = { authRouter };
