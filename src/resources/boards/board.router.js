const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { catcher } = require('../../common/catcher');

router.route('/boards').get(
  catcher(async (req, res) => {
    const boards = await boardService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
);

router.route('/boards/:boardId').get(
  catcher(async (req, res) => {
    const board = await boardService.getById(req.params.boardId);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/boards').post(
  catcher(async (req, res) => {
    if (!Board.isValidForCreate(req.body)) {
      res.status(400).end();
    } else {
      const newBoard = await boardService.createBoard(req.body);
      res.status(200).json(Board.toResponse(newBoard));
    }
  })
);

router.route('/boards/:boardId').put(
  catcher(async (req, res) => {
    if (!Board.isValidForUpdate(req.body)) {
      res.status(400).end();
    } else {
      const newBoard = await boardService.updateBoard(
        req.params.boardId,
        req.body
      );
      res.status(200).json(Board.toResponse(newBoard));
    }
  })
);

router.route('/boards/:boardId').delete(
  catcher(async (req, res) => {
    await boardService.deleteBoard(req.params.boardId);
    res.status(204).end();
  })
);

module.exports = router;
