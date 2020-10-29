const router = require('express').Router();
const boardService = require('./board.service');
const { catcher } = require('../../common/catcher');
const { BoardUtils } = require('./board.model');

router.route('/boards').get(
  catcher(async (req, res) => {
    const boards = await boardService.getAll();
    res.status(200).json(boards.map(BoardUtils.toResponse));
  })
);

router.route('/boards/:boardId').get(
  catcher(async (req, res) => {
    const board = await boardService.getById(req.params.boardId);
    res.status(200).json(BoardUtils.toResponse(board));
  })
);

router.route('/boards').post(
  catcher(async (req, res) => {
    const board = await boardService.createBoard(req.body);
    res.status(200).json(BoardUtils.toResponse(board));
  })
);

router.route('/boards/:boardId').put(
  catcher(async (req, res) => {
    const board = await boardService.updateBoard(req.params.boardId, req.body);
    res.status(200).json(BoardUtils.toResponse(board));
  })
);

router.route('/boards/:boardId').delete(
  catcher(async (req, res) => {
    await boardService.deleteBoard(req.params.boardId);
    res.sendStatus(204);
  })
);

module.exports = router;
