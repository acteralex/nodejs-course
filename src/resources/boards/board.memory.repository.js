const data = [];

const getAll = async () => {
  return data;
};

const getById = async boardId => {
  return data.find(item => item.id === boardId);
};

const getByLogin = async login => {
  return data.find(item => item.login === login);
};

const createBoard = async board => {
  data.push(mapBoard(board));
  return board;
};

const updateBoard = async board => {
  const existBoardIndex = data.findIndex(item => item.id === board.id);
  if (existBoardIndex !== -1) {
    data.splice(existBoardIndex, 1, mapBoard(board));
  }
  return board;
};

const deleteBoard = async boardId => {
  const existBoardIndex = data.findIndex(item => item.id === boardId);
  if (existBoardIndex !== -1) {
    data.splice(existBoardIndex, 1);
  }
};

function mapBoard(board) {
  return {
    id: board.id,
    title: board.title,
    columns: (board.columns || []).map(c => ({
      id: c.id,
      title: c.title,
      order: c.order
    }))
  };
}

module.exports = {
  getAll,
  getById,
  getByLogin,
  createBoard,
  updateBoard,
  deleteBoard
};
