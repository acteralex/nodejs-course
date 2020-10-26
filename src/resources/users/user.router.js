const { catcher } = require('../../common/catcher');
const router = require('express').Router();
const usersService = require('./user.service');

router.route('/users').get(
  catcher(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users);
  })
);

router.route('/users/:userId').get(
  catcher(async (req, res) => {
    const user = await usersService.getById(req.params.userId);
    res.status(200).json(user);
  })
);

router.route('/users').post(
  catcher(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(200).json(user);
  })
);

router.route('/users/:userId').put(
  catcher(async (req, res) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    res.status(200).json(user);
  })
);

router.route('/users/:userId').delete(
  catcher(async (req, res) => {
    await usersService.deleteUser(req.params.userId);
    res.status(204).end();
  })
);

module.exports = router;
