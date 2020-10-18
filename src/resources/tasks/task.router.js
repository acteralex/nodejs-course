const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/boards/:boardId/tasks').get(async (req, res) => {
  await taskService
    .getAllTasksByBoardId(req.params.boardId)
    .then(tasks => res.status(200).json(tasks.map(Task.toResponse)))
    .catch(err => res.status(400).send(err.message));
});

router.route('/boards/:boardId/tasks/:taskId').get(async (req, res) => {
  await taskService
    .getTaskById(req.params.boardId, req.params.taskId)
    .then(task => res.status(200).json(Task.toResponse(task)))
    .catch(err => res.status(404).send(err.message));
});

router.route('/boards/:boardId/tasks').post(async (req, res) => {
  if (!Task.isValidForCreate(req.params.boardId, req.body)) {
    res.status(400).end();
  } else {
    await taskService
      .createTask(req.params.boardId, req.body)
      .then(newTask => res.status(200).json(Task.toResponse(newTask)))
      .catch(err => res.status(400).send(err.message));
  }
});

router.route('/boards/:boardId/tasks/:taskId').put(async (req, res) => {
  if (!Task.isValidForUpdate(req.params.boardId, req.params.taskId, req.body)) {
    res.status(400).end();
  } else {
    await taskService
      .updateTask(req.params.boardId, req.params.taskId, req.body)
      .then(newTask => res.status(200).json(Task.toResponse(newTask)))
      .catch(err => res.status(400).send(err.message));
  }
});

router.route('/boards/:boardId/tasks/:taskId').delete(async (req, res) => {
  await taskService
    .deleteTask(req.params.boardId, req.params.taskId)
    .then(() => res.status(204).end())
    .catch(err => res.status(404).send(err.message));
});

module.exports = router;
