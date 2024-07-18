const { handleError } = require("../helpers/error-helper");
const { findAllIconsService } = require("../services/find-all-icons-service");

const listAllIcons = async (req, res) => {
  try {
    const { folder } = req.params;

    const response = await findAllIconsService(folder);

    res.send(response);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { listAllIcons };
