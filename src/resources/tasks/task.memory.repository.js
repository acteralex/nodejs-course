const data = [];

const getAllTasksByBoardId = async boardId => {
  return data.filter(item => item.boardId === boardId);
};

const getTaskById = async (boardId, taskId) => {
  return data.find(item => item.id === taskId && item.boardId === boardId);
};

const createTask = async task => {
  data.push(mapTask(task));
  return task;
};

const updateTask = async task => {
  const existTaskIndex = data.findIndex(
    item => item.id === task.id && item.boardId === task.boardId
  );
  if (existTaskIndex !== -1) {
    data.splice(existTaskIndex, 1, mapTask(task));
  }
  return task;
};

const deleteTask = async (boardId, taskId) => {
  const existTaskIndex = data.findIndex(
    item => item.id === taskId && item.boardId === boardId
  );
  if (existTaskIndex !== -1) {
    data.splice(existTaskIndex, 1);
  }
};

const deleteTasksByBoardId = async boardId => {
  const tasks = data.filter(item => item.boardId !== boardId);
  data.splice(0, data.length, ...tasks);
};

const unassignUser = async userId => {
  data
    .filter(task => task.userId === userId)
    .forEach(task => (task.userId = null));
};

function mapTask(task) {
  return {
    id: task.id,
    title: task.title,
    order: task.order,
    description: task.description,
    userId: task.userId,
    boardId: task.boardId,
    columnId: task.columnId
  };
}

module.exports = {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unassignUser
};
