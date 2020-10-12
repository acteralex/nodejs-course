const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getAllTasksByBoardId = boardId => tasksRepo.getAllTasksByBoardId(boardId);

const getTaskById = async (boardId, taskId) => {
  const existTask = await tasksRepo.getTaskById(boardId, taskId);
  if (!existTask) {
    throw new Error(
      `A task with ${taskId} id in a board with ${boardId} id was not found.`
    );
  }
  return existTask;
};

const createTask = async (boardId, task) => {
  const newTask = new Task({ ...task, boardId });
  return await tasksRepo.createTask(newTask);
};

const updateTask = async (boardId, taskId, task) => {
  const existTask = await tasksRepo.getTaskById(boardId, taskId);
  if (!existTask) {
    throw new Error(
      `A task with ${taskId} id in a board with ${boardId} id could not be updated.`
    );
  }
  const newTask = new Task({ ...task, boardId, taskId });
  return await tasksRepo.updateTask(newTask);
};

const deleteTask = async (boardId, taskId) => {
  const existTask = await tasksRepo.getTaskById(boardId, taskId);
  if (!existTask) {
    throw new Error(
      `A task with ${taskId} id in a board with ${boardId} could not be deleted.`
    );
  }
  return await tasksRepo.deleteTask(boardId, taskId);
};

const deleteTasksByBoardId = async boardId =>
  tasksRepo.deleteTasksByBoardId(boardId);

const unassignUser = async userId => tasksRepo.unassignUser(userId);

module.exports = {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unassignUser
};
