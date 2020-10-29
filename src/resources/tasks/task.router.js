const router = require('express').Router();
const taskService = require('./task.service');
const { catcher } = require('../../common/catcher');
const { TaskUtils } = require('./task.model');

router.route('/boards/:boardId/tasks').get(
  catcher(
    async (req, res) => {
      const tasks = await taskService.getAllTasksByBoardId(req.params.boardId);
      res.status(200).json(tasks.map(TaskUtils.toResponse));
    },
    (req, res) => {
      res.sendStatus(400);
    }
  )
);

router.route('/boards/:boardId/tasks/:taskId').get(
  catcher(async (req, res) => {
    const task = await taskService.getTaskById(
      req.params.boardId,
      req.params.taskId
    );
    res.status(200).json(TaskUtils.toResponse(task));
  })
);

router.route('/boards/:boardId/tasks').post(
  catcher(async (req, res) => {
    const task = await taskService.createTask(req.params.boardId, req.body);
    res.status(200).json(TaskUtils.toResponse(task));
  })
);

router.route('/boards/:boardId/tasks/:taskId').put(
  catcher(async (req, res) => {
    const task = await taskService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.status(200).json(TaskUtils.toResponse(task));
  })
);

router.route('/boards/:boardId/tasks/:taskId').delete(
  catcher(async (req, res) => {
    await taskService.deleteTask(req.params.boardId, req.params.taskId);
    res.sendStatus(200);
  })
);

module.exports = router;
