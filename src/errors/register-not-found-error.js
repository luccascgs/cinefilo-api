class RegisterNotFoundError extends Error {
  constructor() {
    super("Usuário não encontrado!");
  }
}

module.exports = RegisterNotFoundError;
