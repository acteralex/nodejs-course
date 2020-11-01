const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const createToken = (userId, login) => {
  return jwt.sign({ userId, login }, JWT_SECRET_KEY, {
    expiresIn: '1d'
  });
};

const isValid = token => {
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  createToken,
  isValid
};
