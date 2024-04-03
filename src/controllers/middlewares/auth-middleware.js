const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      throw new Error("Token não informado!");
    }

    if (!authorizationHeader.toLowerCase().startsWith("bearer ")) {
      throw new Error("Token inválido!");
    }

    const accessToken = authorizationHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    jwt.verify(accessToken, secret);

    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

module.exports = { authMiddleware };
