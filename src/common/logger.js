const { transports, createLogger, format } = require('winston');

const delimeter = '===========================================================';
const dateFormat = 'DD-MMM-YYYY HH:mm:ss:SSS';

const loggerFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${level.toUpperCase()} ${timestamp} ${label}:
            \r\n${message}
            \r\n${delimeter}`;
});

const errorTransport = new transports.File({
  filename: 'logs.log',
  level: 'error'
});
const infoTransport = new transports.File({
  filename: 'requests-logs.log',
  level: 'info'
});

const logger = createLogger({
  format: format.combine(
    format.label({ label: 'Request' }),
    format.timestamp({ format: dateFormat }),
    loggerFormat
  ),
  transports: [new transports.Console(), errorTransport, infoTransport]
});

function error(message, onFinishCallback) {
  if (onFinishCallback) {
    errorTransport.on('finish', () => onFinishCallback());
  }
  logger.error(message);
}

function requestInfo(req) {
  requestLog('info', req);
}

function requestLog(level, req) {
  logger.log(
    level,
    `
    url: ${req.method} ${req.originalUrl}\r\n
    query: ${JSON.stringify(req.query)}\r\n
    body: ${JSON.stringify(req.body)}
  `
  );
}

module.exports = {
  error,
  requestInfo
};
