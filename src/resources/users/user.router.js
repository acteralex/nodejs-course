const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/users').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/users/:userId').get(async (req, res) => {
  await usersService
    .getById(req.params.userId)
    .then(user => {
      res.status(200).json(User.toResponse(user));
    })
    .catch(err => {
      res.status(404).send(err.message);
    });
});

router.route('/users').post(async (req, res) => {
  if (!User.isValidForCreate(req.body)) {
    res.status(400).end();
  } else {
    await usersService
      .createUser(req.body)
      .then(newUser => {
        res.status(200).json(User.toResponse(newUser));
      })
      .catch(err => res.status(400).send(err.message));
  }
});

router.route('/users/:userId').put(async (req, res) => {
  if (!User.isValidForUpdate(req.body)) {
    res.status(400).end();
  } else {
    await usersService
      .updateUser(req.params.userId, req.body)
      .then(newUser => res.status(200).json(User.toResponse(newUser)))
      .catch(err => res.status(400).send(err.message));
  }
});

router.route('/users/:userId').delete(async (req, res) => {
  await usersService
    .deleteUser(req.params.userId)
    .then(() => res.status(204).end())
    .catch(err => res.status(404).send(err.message));
});

module.exports = router;
