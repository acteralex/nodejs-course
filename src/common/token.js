const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const createToken = (userId, login) => {
  return jwt.sign({ userId, login }, JWT_SECRET_KEY);
};

module.exports = {
  createToken
};
