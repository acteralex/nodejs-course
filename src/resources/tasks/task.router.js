const router = require('express').Router();
const childRouter = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { catcher } = require('../../common/catcher');
const { TaskUtils } = require('./task.model');
const { Authentication } = require('../../common/authentication');

router.use('/boards/:boardId/tasks', Authentication, childRouter);

childRouter.route('/').get(
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

childRouter.route('/:taskId').get(
  catcher(async (req, res) => {
    const task = await taskService.getTaskById(
      req.params.boardId,
      req.params.taskId
    );
    res.status(200).json(TaskUtils.toResponse(task));
  })
);

childRouter.route('/').post(
  catcher(async (req, res) => {
    const task = await taskService.createTask(req.params.boardId, req.body);
    res.status(200).json(TaskUtils.toResponse(task));
  })
);

childRouter.route('/:taskId').put(
  catcher(async (req, res) => {
    const task = await taskService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.status(200).json(TaskUtils.toResponse(task));
  })
);

childRouter.route('/:taskId').delete(
  catcher(async (req, res) => {
    await taskService.deleteTask(req.params.boardId, req.params.taskId);
    res.sendStatus(200);
  })
);

module.exports = router;
