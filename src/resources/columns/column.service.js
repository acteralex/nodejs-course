const columns = require('./column.memory.repository');

const getAll = () => columns.getAll();

module.exports = { getAll };
