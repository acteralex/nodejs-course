const Hasher = require('../../common/hasher');
const { User } = require('../users/user.model');
const Token = require('../../common/token');
const { HttpError } = require('../../common/http.error');

const login = async (loginValue, password) => {
  const user = await User.findOne({ login: loginValue }).exec();
  if (!user) {
    throw new HttpError(403);
  }

  const match = await Hasher.compareAsync(password, user.password);
  if (!match) {
    throw new HttpError(403);
  }

  return Token.createToken(user.id, user.login);
};

module.exports = {
  login
};
