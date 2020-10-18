const User = require('./user.model');
const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = async userId => {
  const existUser = await usersRepo.getById(userId);
  if (!existUser) {
    throw new Error(`A user with ${userId} id was not found.`);
  }
  return existUser;
};

const createUser = async user => {
  const newUser = new User(user);
  return await usersRepo.createUser(newUser);
};

const updateUser = async (userId, user) => {
  const existUser = await usersRepo.getById(userId);
  if (!existUser) {
    throw new Error(
      `A user with ${userId} could not be updated, because user does not exist.`
    );
  }
  const newUser = new User({ ...user, id: userId });
  return await usersRepo.updateUser(newUser);
};

const deleteUser = async userId => {
  const existUser = await usersRepo.getById(userId);
  if (!existUser) {
    throw new Error(
      `A user with ${userId} could not be deleted, because user does not exist.`
    );
  }
  return await usersRepo.deleteUser(userId).then(() => {
    tasksService.unassignUser(userId);
  });
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
