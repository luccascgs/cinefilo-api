const { handleError } = require("../helpers/error-helper");
const { signInService } = require("../services/sign-in-service");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await signInService(email, password);

    res.send(response);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { signIn };
