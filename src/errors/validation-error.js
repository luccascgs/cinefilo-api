class ValidationError extends Error {
  constructor(prop) {
    super(
      prop ? `Campo obrigatório: ${prop}!` : "Campo obrigatório não informado!"
    );
  }
}

module.exports = ValidationError;
