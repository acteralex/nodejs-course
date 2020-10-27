const taskService = require('../tasks/task.service');
const { HttpError } = require('../../common/http.error');
const { Board, BoardUtils } = require('./board.model');

const getAll = async () => {
  return (await Board.find()).map(BoardUtils.toResponse);
};

const getById = async boardId => {
  if (!BoardUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }
  const board = await Board.findById(boardId);
  if (!board) {
    throw new HttpError(404, `A board with ${boardId} id was not found.`);
  }
  return BoardUtils.toResponse(board);
};

const createBoard = async boardData => {
  const board = await Board.create({ ...boardData });
  return BoardUtils.toResponse(board);
};

const updateBoard = async (boardId, boardData) => {
  if (!BoardUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }
  return await Board.findByIdAndUpdate(
    boardId,
    { ...boardData },
    { useFindAndModify: false }
  ).exec((err, res) => {
    if (!res) {
      throw new HttpError(
        400,
        `A board with ${boardId} could not be updated, because board does not exist.`
      );
    }
  });
};

const deleteBoard = async boardId => {
  if (!BoardUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }
  await Board.findByIdAndDelete(boardId).exec(async (err, res) => {
    if (!res) {
      throw new HttpError(
        404,
        `A board with ${boardId} could not be deleted, because board does not exist.`
      );
    }
  });
  await taskService.deleteTasksByBoardId(boardId);
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
