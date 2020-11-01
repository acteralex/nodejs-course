const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUND } = require('../common/config');

const hashAsync = async value => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUND);
  return await bcrypt.hash(value, salt);
};

const compareAsync = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

module.exports = {
  hashAsync,
  compareAsync
};
