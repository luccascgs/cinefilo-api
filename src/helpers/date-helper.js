const { format: formatDate } = require("date-fns");

const format = (date, pattern = "yyyy-MM-dd") => {
  return formatDate(date, pattern);
};

module.exports = { format };
