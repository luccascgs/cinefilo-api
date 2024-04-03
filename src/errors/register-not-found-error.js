class RegisterNotFoundError extends Error {
  constructor() {
    super("Registro não encontrado!");
  }
}

module.exports = RegisterNotFoundError;
