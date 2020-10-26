const mongoose = require('mongoose');
const { taskSchema } = require('./task.schema');

const Task = mongoose.model('Task', taskSchema);

class TaskUtils {
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }

  static isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

module.exports = {
  Task,
  TaskUtils
};
