class SignInError extends Error {
  constructor() {
    super("Usuário ou senha inválidos!");
  }
}

module.exports = SignInError;
