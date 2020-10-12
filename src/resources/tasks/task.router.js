const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/boards/:boardId/tasks').get(async (req, res) => {
  await taskService
    .getAllTasksByBoardId(req.params.boardId)
    .then(tasks => res.status(200).json(tasks.map(Task.toResponse)))
    .catch(() => res.status(400));
  res.end();
});

router.route('/boards/:boardId/tasks/:taskId').get(async (req, res) => {
  await taskService
    .getTaskById(req.params.boardId, req.params.taskId)
    .then(task => res.status(200).json(Task.toResponse(task)))
    .catch(() => res.status(404));
  res.end();
});

router.route('/boards/:boardId/tasks').post(async (req, res) => {
  if (!Task.isValidForCreate(req.params.boardId, req.body)) {
    res.status(400);
  } else {
    await taskService
      .createTask(req.params.boardId, req.body)
      .then(newTask => res.status(200).json(Task.toResponse(newTask)))
      .catch(() => res.status(400));
  }
  res.end();
});

router.route('/boards/:boardId/tasks/:taskId').put(async (req, res) => {
  if (!Task.isValidForUpdate(req.params.boardId, req.params.taskId, req.body)) {
    res.status(400);
  } else {
    await taskService
      .updateTask(req.params.boardId, req.params.taskId, req.body)
      .then(newTask => res.status(200).json(Task.toResponse(newTask)))
      .catch(() => res.status(400));
  }
  res.end();
});

router.route('/boards/:boardId/tasks/:taskId').delete(async (req, res) => {
  await taskService
    .deleteTask(req.params.boardId, req.params.taskId)
    .then(() => res.status(204))
    .catch(() => res.status(404));
  res.end();
});

module.exports = router;
