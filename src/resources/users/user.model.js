const uuid = require('uuid');

class User {
  constructor({ id = uuid(), name, login, password = 'P@55w0rd' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static isValidForCreate(user) {
    if (!user.login || !user.name || !user.password) {
      return false;
    }
    return true;
  }

  static isValidForUpdate(user) {
    if (!user.login || !user.name || !user.password) {
      return false;
    }
    return true;
  }
}

module.exports = User;
