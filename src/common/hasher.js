const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUND } = require('../common/config');

const hash = async value => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUND);
  return await bcrypt.hash(value, salt);
};

module.exports = {
  hash
};
