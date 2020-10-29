const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    collection: 'users',
    versionKey: false
  }
);

module.exports = {
  userSchema
};
