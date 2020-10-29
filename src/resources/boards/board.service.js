const tasksService = require('../tasks/task.service');
const { HttpError } = require('../../common/http.error');
const { Board, BoardUtils } = require('./board.model');

const getAll = async () => {
  return await Board.find().exec();
};

const getById = async boardId => {
  if (!BoardUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }

  const board = await Board.findById(boardId).exec();
  if (!board) {
    throw new HttpError(404, `A board with ${boardId} id was not found.`);
  }
  return board;
};

const createBoard = async boardData => {
  return await Board.create({ ...boardData });
};

const updateBoard = async (boardId, boardData) => {
  if (!BoardUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }

  const board = await Board.findByIdAndUpdate(
    boardId,
    { ...boardData },
    { useFindAndModify: false }
  ).exec();

  if (!board) {
    throw new HttpError(
      400,
      `A board with ${boardId} could not be updated, because board does not exist.`
    );
  }

  return board;
};

const deleteBoard = async boardId => {
  if (!BoardUtils.isValidId(boardId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }

  await Board.findByIdAndDelete(boardId, (err, res) => {
    if (!res) {
      throw new HttpError(
        404,
        `A board with ${boardId} could not be deleted, because board does not exist.`
      );
    }
  }).exec();
  await tasksService.deleteTasksByBoardId(boardId);
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
