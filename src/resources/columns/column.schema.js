const { Schema } = require('mongoose');

const columnSchema = new Schema(
  {
    title: { type: String, required: true },
    order: Number
  },
  {
    collection: 'columns'
  }
);

module.exports = {
  columnSchema
};
