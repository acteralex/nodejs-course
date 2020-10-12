const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/boards').get(async (req, res) => {
  await boardService
    .getAll()
    .then(boards => res.status(200).json(boards.map(Board.toResponse)))
    .catch(() => res.status(400));
  res.end();
});

router.route('/boards/:boardId').get(async (req, res) => {
  await boardService
    .getById(req.params.boardId)
    .then(board => res.status(200).json(Board.toResponse(board)))
    .catch(() => res.status(404));
  res.end();
});

router.route('/boards').post(async (req, res) => {
  if (!Board.isValidForCreate(req.body)) {
    res.status(400);
  } else {
    await boardService
      .createBoard(req.body)
      .then(newBoard => res.status(200).json(Board.toResponse(newBoard)))
      .catch(() => res.status(400));
  }
  res.end();
});

router.route('/boards/:boardId').put(async (req, res) => {
  if (!Board.isValidForUpdate(req.body)) {
    res.status(400);
  } else {
    await boardService
      .updateBoard(req.params.boardId, req.body)
      .then(newBoard => res.status(200).json(Board.toResponse(newBoard)))
      .catch(() => res.status(400));
  }
  res.end();
});

router.route('/boards/:boardId').delete(async (req, res) => {
  await boardService
    .deleteBoard(req.params.boardId)
    .then(() => res.status(204))
    .catch(() => res.status(404));
  res.end();
});

module.exports = router;
