const { catcher } = require('../../common/catcher');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/users').get(
  catcher(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/users/:userId').get(
  catcher(async (req, res) => {
    const user = await usersService.getById(req.params.userId);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/users').post(
  catcher(async (req, res) => {
    if (!User.isValidForCreate(req.body)) {
      res.status(400).end();
    } else {
      const newUser = await usersService.createUser(req.body);
      res.status(200).json(User.toResponse(newUser));
    }
  })
);

router.route('/users/:userId').put(
  catcher(async (req, res) => {
    if (!User.isValidForUpdate(req.body)) {
      res.status(400).end();
    } else {
      const newUser = await usersService.updateUser(
        req.params.userId,
        req.body
      );
      res.status(200).json(User.toResponse(newUser));
    }
  })
);

router.route('/users/:userId').delete(
  catcher(async (req, res) => {
    await usersService.deleteUser(req.params.userId);
    res.status(204).end();
  })
);

module.exports = router;
