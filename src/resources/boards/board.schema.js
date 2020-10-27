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
    id: true,
    collection: 'boards',
    versionKey: false
  }
);

module.exports = {
  boardSchema
};
