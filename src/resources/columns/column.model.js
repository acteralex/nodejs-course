const mongoose = require('mongoose');

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
  ColumnUtils
};
