const SignInError = require("../errors/singn-in-error");
const ValidationError = require("../errors/validation-error");
const RegisterNotFoundError = require("../errors/register-not-found-error");
const UsernameDateError = require("../errors/username-date-error");
const UsernameError = require("../errors/username-error");

const handleError = (err, res) => {
  console.error(err);

  if (err instanceof SignInError) {
    return res.status(401).send({
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).send({
      message: err.message,
    });
  }

  if (err instanceof RegisterNotFoundError) {
    return res.status(404).send({
      message: err.message,
    });
  }

  if (err instanceof UsernameDateError) {
    return res.status(404).send({
      message: err.message,
    });
  }

  if (err instanceof UsernameError) {
    return res.status(404).send({
      message: err.message,
    });
  }

  return res.status(500).send({
    message: "Erro interno no servidor",
  });
};

module.exports = { handleError };
