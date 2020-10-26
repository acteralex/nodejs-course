const mongoose = require('mongoose');
const { columnSchema } = require('../columns/column.schema');

const Column = mongoose.model('Column', columnSchema);

class ColumnUtils {
  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }

  static isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

module.exports = {
  Column,
  ColumnUtils
};
