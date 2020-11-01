const router = require('express').Router();
const childRouter = require('express').Router({ mergeParams: true });
const boardService = require('./board.service');
const { catcher } = require('../../common/catcher');
const { BoardUtils } = require('./board.model');
const { Authentication } = require('../../common/authentication');

router.use('/boards', Authentication, childRouter);

childRouter.route('/').get(
  catcher(async (req, res) => {
    const boards = await boardService.getAll();
    res.status(200).json(boards.map(BoardUtils.toResponse));
  })
);

childRouter.route('/:boardId').get(
  catcher(async (req, res) => {
    const board = await boardService.getById(req.params.boardId);
    res.status(200).json(BoardUtils.toResponse(board));
  })
);

childRouter.route('/').post(
  catcher(async (req, res) => {
    const board = await boardService.createBoard(req.body);
    res.status(200).json(BoardUtils.toResponse(board));
  })
);

childRouter.route('/:boardId').put(
  catcher(async (req, res) => {
    const board = await boardService.updateBoard(req.params.boardId, req.body);
    res.status(200).json(BoardUtils.toResponse(board));
  })
);

childRouter.route('/:boardId').delete(
  catcher(async (req, res) => {
    await boardService.deleteBoard(req.params.boardId);
    res.sendStatus(204);
  })
);

module.exports = router;
