const ValidationError = require("../errors/validation-error");
const { listAllIcons } = require("../repositories/icon-repositiry");

const findAllIconsService = async (folder) => {
  if (!folder) throw new ValidationError("Nome da pasta");
  return await listAllIcons(folder);
};

module.exports = { findAllIconsService };
