/* eslint-disable no-process-exit */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./common/logger');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.requestInfo(req);
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(loginRouter, userRouter, boardRouter, taskRouter);

app.use((err, req, res, next) => {
  if (err.status !== undefined) {
    if (err.message !== undefined) {
      res
        .status(err.status)
        .contentType('text/plain; charset=utf-8')
        .send(err.message);
    } else {
      res.sendStatus(err.status);
    }
  } else {
    res.sendStatus(500);
  }
  next();
});

process
  .on('uncaughtException', err => {
    logger.error(err.stack || err.message, () => process.exit(1));
  })
  .on('unhandledRejection', reason => {
    const message =
      typeof reason === 'string' ? reason : JSON.stringify(reason);
    logger.error(message, () => process.exit(1));
  });

module.exports = app;
