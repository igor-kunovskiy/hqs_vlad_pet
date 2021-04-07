const jwt = require('jsonwebtoken');

const encode = data => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, { noTimestamp: true });
};

const decode = token => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { encode, decode };