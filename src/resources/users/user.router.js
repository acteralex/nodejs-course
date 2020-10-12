const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/users').get(async (req, res) => {
  const users = await usersService.getAll();
  res
    .status(200)
    .json(users.map(User.toResponse))
    .end();
});

router.route('/users/:userId').get(async (req, res) => {
  await usersService
    .getById(req.params.userId)
    .then(user => {
      res.status(200).json(User.toResponse(user));
    })
    .catch(() => {
      res.status(404);
    });
  res.end();
});

router.route('/users').post(async (req, res) => {
  if (!User.isValidForCreate(req.body)) {
    res.status(400);
  } else {
    await usersService
      .createUser(req.body)
      .then(newUser => {
        res.status(200).json(User.toResponse(newUser));
      })
      .catch(() => res.status(400));
  }
  res.end();
});

router.route('/users/:userId').put(async (req, res) => {
  if (!User.isValidForUpdate(req.body)) {
    res.status(400);
  } else {
    await usersService
      .updateUser(req.params.userId, req.body)
      .then(newUser => res.status(200).json(User.toResponse(newUser)))
      .catch(() => res.status(400));
  }
  res.end();
});

router.route('/users/:userId').delete(async (req, res) => {
  await usersService
    .deleteUser(req.params.userId)
    .then(() => res.status(204))
    .catch(() => res.status(404));
  res.end();
});

module.exports = router;
