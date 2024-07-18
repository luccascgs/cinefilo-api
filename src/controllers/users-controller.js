const { handleError } = require("../helpers/error-helper");
const { createUserService } = require("../services/create-user-service");
const { findUserByUserIdService } = require("../services/find-user-by-user-id");
const {
  findUserByUsernameService,
} = require("../services/find-user-by-username");
const {
  recoverPasswordService,
} = require("../services/recover-password-service");
const { updateIconService } = require("../services/update-icon-service");
const {
  updateUsernameService,
} = require("../services/update-username-service");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const response = await createUserService(username, email, password);

    res.status(201).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const findByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const response = await findUserByUsernameService(username);
    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await findUserByUserIdService(id);
    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const updateUsername = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const response = await updateUsernameService(id, username);

    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const updateIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const { background, head } = req.body;

    const response = await updateIconService(id, background, head);

    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const response = await recoverPasswordService(email);

    res.status(200).send(response);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  createUser,
  findByUsername,
  findById,
  updateUsername,
  updateIcon,
  recoverPassword,
};
