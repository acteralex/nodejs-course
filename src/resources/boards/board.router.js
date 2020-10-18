const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/boards').get(async (req, res) => {
  await boardService
    .getAll()
    .then(boards => res.status(200).json(boards.map(Board.toResponse)))
    .catch(err => res.status(400).send(err.message));
});

router.route('/boards/:boardId').get(async (req, res) => {
  await boardService
    .getById(req.params.boardId)
    .then(board => res.status(200).json(Board.toResponse(board)))
    .catch(err => res.status(404).send(err.message));
});

router.route('/boards').post(async (req, res) => {
  if (!Board.isValidForCreate(req.body)) {
    res.status(400).end();
  } else {
    await boardService
      .createBoard(req.body)
      .then(newBoard => res.status(200).json(Board.toResponse(newBoard)))
      .catch(err => res.status(400).send(err.message));
  }
});

router.route('/boards/:boardId').put(async (req, res) => {
  if (!Board.isValidForUpdate(req.body)) {
    res.status(400).end();
  } else {
    await boardService
      .updateBoard(req.params.boardId, req.body)
      .then(newBoard => res.status(200).json(Board.toResponse(newBoard)))
      .catch(err => res.status(400).send(err.message));
  }
});

router.route('/boards/:boardId').delete(async (req, res) => {
  await boardService
    .deleteBoard(req.params.boardId)
    .then(() => res.status(204).end())
    .catch(err => res.status(404).send(err.message));
});

module.exports = router;
