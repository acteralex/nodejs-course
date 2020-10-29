const { Schema } = require('mongoose');

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    columns: [
      {
        title: { type: String, required: true },
        order: Number
      }
    ]
  },
  {
    collection: 'boards',
    versionKey: false
  }
);

module.exports = {
  boardSchema
};
