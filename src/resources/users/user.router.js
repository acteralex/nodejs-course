const { catcher } = require('../../common/catcher');
const router = require('express').Router();
const childRouter = require('express').Router({ mergeParams: true });
const usersService = require('./user.service');
const { UserUtils } = require('./user.model');
const { Authentication } = require('../../common/authentication');

router.use('/users', Authentication, childRouter);

childRouter.route('/').get(
  catcher(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(UserUtils.toResponse));
  })
);

childRouter.route('/:userId').get(
  catcher(async (req, res) => {
    const user = await usersService.getById(req.params.userId);
    res.status(200).json(UserUtils.toResponse(user));
  })
);

childRouter.route('/').post(
  catcher(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(200).json(UserUtils.toResponse(user));
  })
);

childRouter.route('/:userId').put(
  catcher(async (req, res) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    res.status(200).json(UserUtils.toResponse(user));
  })
);

childRouter.route('/:userId').delete(
  catcher(async (req, res) => {
    await usersService.deleteUser(req.params.userId);
    res.sendStatus(204);
  })
);

module.exports = router;
