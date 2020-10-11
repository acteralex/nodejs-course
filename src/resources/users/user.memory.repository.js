const data = [];

const getAll = async () => {
  return data;
};

const getById = async userId => {
  return data.find(item => item.id === userId);
};

const getByLogin = async login => {
  return data.find(item => item.login === login);
};

const createUser = async user => {
  data.push(mapUser(user));
  return user;
};

const updateUser = async user => {
  const existUserIndex = data.findIndex(item => item.id === user.id);
  if (existUserIndex !== -1) {
    data.splice(existUserIndex, 1, mapUser(user));
  }
  return user;
};

const deleteUser = async userId => {
  const existUserIndex = data.findIndex(item => item.id === userId);
  if (existUserIndex !== -1) {
    data.splice(existUserIndex, 1);
  }
};

function mapUser(user) {
  return {
    id: user.id,
    name: user.name,
    login: user.login,
    password: user.password
  };
}

module.exports = {
  getAll,
  getById,
  getByLogin,
  createUser,
  updateUser,
  deleteUser
};
