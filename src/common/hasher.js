const bcrypt = require('bcrypt');
const saltRounds = 13;

const hash = async value => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(value, salt);
};

module.exports = {
  hash
};
