const { format: formatDate } = require("date-fns");

const format = (date) => {
  return formatDate(date, "yyyy-MM-dd");
};

module.exports = { format };
