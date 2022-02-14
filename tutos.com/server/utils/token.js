const jwt = require("jsonwebtoken");
var moment = require("moment");

const generateToken = () => {
  return { token: jwt.sign({ date: moment() }, process.env.PRIVATE_KEY) };
};

const validateToken = (token) => {
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  if (moment().diff(decoded.date, "minutes") > 5) {
    return false;
  }
  return true;
};

module.exports = {
  generateToken,
  validateToken,
};
