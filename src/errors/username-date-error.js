class UsernameDateError extends Error {
  constructor() {
    super("Espere 14 dias para atualizar o nome de usuário");
  }
}

module.exports = UsernameDateError;
