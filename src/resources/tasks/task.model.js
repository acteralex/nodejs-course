const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title,
    order = 0,
    description,
    userId,
    boardId,
    columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }

  static isValidForCreate(boardId, task) {
    if (
      !task.title ||
      task.order === undefined ||
      !task.description ||
      !boardId
    ) {
      return false;
    }
    return true;
  }

  static isValidForUpdate(boardId, taskId, task) {
    if (
      !task.title ||
      task.order === undefined ||
      !task.description ||
      !boardId ||
      !taskId
    ) {
      return false;
    }
    return true;
  }
}

module.exports = Task;
