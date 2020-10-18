const { transports, createLogger, format } = require('winston');
// const { timestamp, printf } = winston.format;

const delimeter = '===========================================================';
const dateFormat = 'DD-MMM-YYYY HH:mm:ss:SSS';

const loggerFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${level.toUpperCase()} ${timestamp} ${label}:
            \r\n${message}
            \r\n${delimeter}`;
});

const unhandledLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.label({ label: 'Unhandled' }),
    format.timestamp({ format: dateFormat }),
    loggerFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs.log' })
  ]
});

const requestLogger = createLogger({
  format: format.combine(
    format.label({ label: 'Request' }),
    format.timestamp({ format: dateFormat }),
    loggerFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'requests-logs.log' })
  ]
});

function error(message) {
  unhandledLogger.error(message);
}

function requestInfo(req) {
  requestLog('info', req);
}

function requestError(req) {
  requestLog('error', req);
}

function requestLog(level, req) {
  requestLogger.log(
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
  requestInfo,
  requestError
};
