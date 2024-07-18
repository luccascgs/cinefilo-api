const { differenceInDays } = require("date-fns");
const RegisterNotFoundError = require("../errors/register-not-found-error");
const ValidationError = require("../errors/validation-error");
const { format } = require("../helpers/date-helper");
const { findById, updateIcon } = require("../repositories/users-repository");

const updateIconService = async (id, background, head) => {
  if (!background) throw new ValidationError("Plano de fundo");
  if (!head) throw new ValidationError("Cabeça");

  const user = await findById(id);
  if (!user) throw new RegisterNotFoundError();

  return await updateIcon({ id, background, head });
};

module.exports = { updateIconService };
