const jwt = require("jsonwebtoken");
const { findByEmail } = require("../repositories/users-repository");
const { encrypt } = require("../helpers/crypto-helper");
const SignInError = require("../errors/singn-in-error");

const jwtSecret = process.env.JWT_SECRET;

const signInService = async (email, password) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new SignInError();
  }

  const encryptedPassword = encrypt(password);

  if (encryptedPassword !== user.password) {
    throw new SignInError();
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    jwtSecret,
    { expiresIn: "1d" }
  );

  return { accessToken };
};

module.exports = { signInService };
