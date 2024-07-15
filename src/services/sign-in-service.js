// const jwt = require("jsonwebtoken");
const {
  findByEmail,
  findByUsername,
  login,
} = require("../repositories/users-repository");
// const { encrypt } = require("../helpers/crypto-helper");
const SignInError = require("../errors/singn-in-error");
const ValidationError = require("../errors/validation-error");

const jwtSecret = process.env.JWT_SECRET;

const signInService = async (username, email, password) => {
  if (!email && !username)
    throw new ValidationError("Email ou Nome de usuário");
  if (!password) throw new ValidationError("Senha");
  const user = email
    ? await findByEmail(email)
    : await findByUsername(username);

  if (!user) throw new SignInError();

  return await login({ email: user.email, password });

  // const encryptedPassword = encrypt(password);
  // if (encryptedPassword !== user.password) {
  //   throw new SignInError();
  // }
  // const accessToken = jwt.sign(
  //   { id: user.id, email: user.email, name: user.name },
  //   jwtSecret,
  //   { expiresIn: "1d" }
  // );
  // return { accessToken };
};

module.exports = { signInService };
