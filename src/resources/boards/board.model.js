const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title, columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  static isValidForCreate(board) {
    if (!board.title || !board.columns) {
      return false;
    }
    return true;
  }

  static isValidForUpdate(board) {
    if (!board.title || !board.columns) {
      return false;
    }
    return true;
  }
}

module.exports = Board;
