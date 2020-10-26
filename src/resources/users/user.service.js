const { User, UserUtils } = require('./user.model');
const { HttpError } = require('../../common/http.error');
const tasksService = require('../tasks/task.service');

const getAll = async () => {
  return (await User.find().exec()).map(UserUtils.toResponse);
};

const getById = async userId => {
  if (!UserUtils.isValidId(userId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new HttpError(404, `A user with ${userId} id was not found.`);
  }
  return UserUtils.toResponse(user);
};

const createUser = async userData => {
  const user = await User.create(userData);
  return UserUtils.toResponse(user);
};

const updateUser = async (userId, userData) => {
  if (!UserUtils.isValidId(userId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }
  return await User.findByIdAndUpdate(userId, userData, {
    useFindAndModify: false
  }).exec((err, res) => {
    if (!res) {
      throw new HttpError(
        400,
        `A user with ${userId} could not be updated, because user does not exist.`
      );
    }
  });
};

const deleteUser = async userId => {
  if (!UserUtils.isValidId(userId)) {
    throw new HttpError(400, 'Wrong type Id.');
  }
  await User.findByIdAndDelete(userId).exec(async (err, res) => {
    if (!res) {
      throw new HttpError(
        404,
        `A user with ${userId} could not be deleted, because user does not exist.`
      );
    }
  });
  await tasksService.unassignUser(userId);
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
