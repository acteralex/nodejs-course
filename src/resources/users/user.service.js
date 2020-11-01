const { User, UserUtils } = require('./user.model');
const { HttpError } = require('../../common/http.error');
const tasksService = require('../tasks/task.service');
const Hasher = require('../../common/hasher');

const getAll = async () => {
  return await User.find().exec();
};

const getById = async userId => {
  if (!UserUtils.isValidId(userId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    throw new HttpError(404, `A user with ${userId} id was not found.`);
  }
  return user;
};

const createUser = async userData => {
  const passwordHash = await Hasher.hash(userData.password);
  return await User.create({ ...userData, password: passwordHash });
};

const updateUser = async (userId, userData) => {
  if (!UserUtils.isValidId(userId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }

  const user = await User.findByIdAndUpdate(userId, userData, {
    useFindAndModify: false
  }).exec();

  if (!user) {
    throw new HttpError(
      400,
      `A user with ${userId} could not be updated, because user does not exist.`
    );
  }

  return user;
};

const deleteUser = async userId => {
  if (!UserUtils.isValidId(userId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }

  await User.findByIdAndDelete(userId, (err, res) => {
    if (!res) {
      throw new HttpError(
        404,
        `A user with ${userId} could not be deleted, because user does not exist.`
      );
    }
  }).exec();
  await tasksService.unassignUser(userId);
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
