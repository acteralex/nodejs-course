const mongoose = require('mongoose');
const { boardSchema } = require('./board.schema');

const Board = mongoose.model('Board', boardSchema);

class BoardUtils {
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  static isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

module.exports = {
  Board,
  BoardUtils
};
