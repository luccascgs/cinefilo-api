const { differenceInDays } = require("date-fns");
const RegisterNotFoundError = require("../errors/register-not-found-error");
const UsernameError = require("../errors/username-error");
const ValidationError = require("../errors/validation-error");
const { format } = require("../helpers/date-helper");
const {
  findById,
  updateUsername,
  findByUsername,
} = require("../repositories/users-repository");
const UsernameDateError = require("../errors/username-date-error");

const updateUsernameService = async (id, username) => {
  if (!username) throw new ValidationError("Nome de usuário");

  const today = format(new Date());

  const user = await findById(id);
  if (!user) throw new RegisterNotFoundError();

  const result = await findByUsername(username);
  if (result) throw new UsernameError();

  const difference = differenceInDays(today, user.lastUpdate);
  if (difference > 14) {
    const updatedMovie = await updateUsername({ id, username, today });
    return updatedMovie;
  }
  throw new UsernameDateError();
};

module.exports = { updateUsernameService };
