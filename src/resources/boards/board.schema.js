const { Schema } = require('mongoose');
const { columnSchema } = require('../columns/column.schema');

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    columns: [columnSchema]
  },
  {
    collection: 'boards'
  }
);

module.exports = {
  boardSchema
};
