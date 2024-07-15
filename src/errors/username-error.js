class UsernameError extends Error {
  constructor() {
    super("Nome de usuário indisponível");
  }
}

module.exports = UsernameError;
