const Board = require('./board.model');
const boardRepo = require('./board.memory.repository');
const Column = require('../columns/column.model');
const taskService = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();

const getById = async boardId => {
  const existBoard = await boardRepo.getById(boardId);
  if (!existBoard) {
    throw new Error(`A board with ${boardId} id was not found.`);
  }
  return existBoard;
};

const createBoard = async board => {
  const columns = (board.columns || []).map(c => new Column(c));
  const newBoard = new Board({ ...board, columns });
  return await boardRepo.createBoard(newBoard);
};

const updateBoard = async (boardId, board) => {
  const existBoard = await boardRepo.getById(boardId);
  if (!existBoard) {
    throw new Error(
      `A board with ${boardId} could not be updated, because board does not exist.`
    );
  }
  const columns = (board.columns || []).map(c => new Column(c));
  const newBoard = new Board({ ...board, columns, id: boardId });
  return await boardRepo.updateBoard(newBoard);
};

const deleteBoard = async boardId => {
  const existBoard = await boardRepo.getById(boardId);
  if (!existBoard) {
    throw new Error(
      `A board with ${boardId} could not be deleted, because board does not exist.`
    );
  }
  await taskService.deleteTasksByBoardId().then(() => {
    boardRepo.deleteBoard(boardId);
  });
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
