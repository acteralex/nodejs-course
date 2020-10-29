const mongoose = require('mongoose');
const { userSchema } = require('./user.schema');

const User = mongoose.model('User', userSchema);

class UserUtils {
  static toResponse(user) {
    const { _id, name, login } = user;
    return { id: _id, name, login };
  }

  static isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

module.exports = {
  UserUtils,
  User
};
