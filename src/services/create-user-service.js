const UsernameError = require("../errors/username-error");
const ValidationError = require("../errors/validation-error");
const { format } = require("../helpers/date-helper");
const { create, findByUsername } = require("../repositories/users-repository");

const createUserService = async (username, email, password) => {
  if (!username) throw new ValidationError("Nome de usuário");
  if (!email) throw new ValidationError("Email");
  if (!password) throw new ValidationError("Senha");

  const date = format(new Date());

  const result = await findByUsername(username);
  if (result) throw new UsernameError();

  console.log({ username, email, password }, date);

  return await create({ username, email, password }, date);
};

module.exports = { createUserService };
