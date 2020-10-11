const router = require('express').Router();
const Column = require('./column.model');
const columnsService = require('./column.service');

router.route('/').get(async (req, res) => {
  const columns = await columnsService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(columns.map(Column.toResponse));
});

module.exports = router;
