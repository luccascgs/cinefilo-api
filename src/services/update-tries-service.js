const ValidationError = require("../errors/validation-error");
const { findById, updateTries } = require("../repositories/users-repository");

const updateTriesService = async (id, trie) => {
  if (!trie) throw new ValidationError("Tentativa");

  const user = await findById(id);

  const newTries = [...user.tries, trie];

  return await updateTries(id, newTries);
};

module.exports = { updateTriesService };
