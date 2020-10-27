const { Task, TaskUtils } = require('./task.model');
const { HttpError } = require('../../common/http.error');

const getAllTasksByBoardId = async boardId => {
  if (!TaskUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type boardId.');
  }
  return (await Task.find().find({ boardId })).map(TaskUtils.toResponse);
};

const getTaskById = async (boardId, taskId) => {
  if (!TaskUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type boardId.');
  }
  if (!TaskUtils.isValidId(taskId)) {
    throw new HttpError(400, 'Wrong type taskId.');
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new HttpError(
      404,
      `A task with ${taskId} id in a board with ${boardId} id was not found.`
    );
  }
  return TaskUtils.toResponse(task);
};

const createTask = async (boardId, taskData) => {
  if (!TaskUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type boardId.');
  }

  const task = await Task.create({ ...taskData, boardId });
  return TaskUtils.toResponse(task);
};

const updateTask = async (boardId, taskId, taskData) => {
  if (!TaskUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type boardId.');
  }
  if (!TaskUtils.isValidId(taskId)) {
    throw new HttpError(400, 'Wrong type taskId.');
  }

  return await Task.findByIdAndUpdate(
    taskId,
    { ...taskData, boardId },
    { useFindAndModify: false }
  ).exec((err, res) => {
    if (!res) {
      throw new HttpError(
        400,
        `A task with ${taskId} id in a board with ${boardId} id could not be updated.`
      );
    }
  });
};

const deleteTask = async (boardId, taskId) => {
  if (!TaskUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type boardId.');
  }
  if (!TaskUtils.isValidId(taskId)) {
    throw new HttpError(400, 'Wrong type taskId.');
  }

  await Task.findByIdAndDelete(taskId).exec((err, res) => {
    if (!res) {
      throw new HttpError(
        404,
        `A task with ${taskId} id in a board with ${boardId} could not be deleted.`
      );
    }
  });
};

const deleteTasksByBoardId = async boardId => {
  await Task.deleteMany({ boardId });
};

const unassignUser = async userId => {
  await Task.updateMany({ userId }, { $set: { userId: null } });
};

module.exports = {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unassignUser
};
