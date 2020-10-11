const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/boards').get(async (req, res) => {
  const boards = await boardService.getAll();
  res
    .status(200)
    .json(boards.map(Board.toResponse))
    .end();
});

router.route('/boards/:boardId').get(async (req, res) => {
  try {
    const board = await boardService.getById(req.params.boardId);
    res.status(200).json(Board.toResponse(board));
  } catch {
    res.status(404);
  }
  res.end();
});

router.route('/boards').post(async (req, res) => {
  if (!Board.isValidForCreate(req.body)) {
    res.status(400);
  } else {
    try {
      const newBoard = await boardService.createBoard(req.body);
      res.status(200).json(Board.toResponse(newBoard));
    } catch {
      res.status(400);
    }
  }
  res.end();
});

router.route('/boards/:boardId').put(async (req, res) => {
  if (!Board.isValidForUpdate(req.body)) {
    res.status(400);
  } else {
    try {
      const newBoard = await boardService.updateBoard(
        req.params.boardId,
        req.body
      );
      res.status(200).json(Board.toResponse(newBoard));
    } catch {
      res.status(400);
    }
  }
  res.end();
});

router.route('/boards/:boardId').delete(async (req, res) => {
  try {
    await boardService.deleteBoard(req.params.boardId);
    res.status(204);
  } catch {
    res.status(404);
  }
  res.end();
});

module.exports = router;
