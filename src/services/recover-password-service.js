const RegisterNotFoundError = require("../errors/register-not-found-error");
const UsernameError = require("../errors/username-error");
const ValidationError = require("../errors/validation-error");
const {
  update,
  findByEmail,
  recoverPassword,
} = require("../repositories/users-repository");
const UsernameDateError = require("../errors/username-date-error");

const recoverPasswordService = async (email) => {
  if (!email) throw new ValidationError("Email");

  const user = await findByEmail(email);
  if (!user) throw new RegisterNotFoundError();

  return await recoverPassword(email);
};

module.exports = { recoverPasswordService };
