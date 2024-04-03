const crypto = require("node:crypto");

const salt = process.env.PASSWORD_SALT;

const encrypt = (value) => {
  return crypto.pbkdf2Sync(value, salt, 100000, 64, "sha512").toString("hex");
};

module.exports = { encrypt };
