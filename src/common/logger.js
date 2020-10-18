const { transports, createLogger, format } = require('winston');
// const { timestamp, printf } = winston.format;

const delimeter = '===========================================================';
const dateFormat = 'DD-MMM-YYYY HH:mm:ss:SSS';

const unhandledLoggerErrorFormat = format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} ${level.toUpperCase()}:
            \r\n${message}
            \r\n${delimeter}`;
  }
);

const unhandledLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.label({ label: 'Unhandled' }),
    format.timestamp({ format: dateFormat }),
    unhandledLoggerErrorFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs.log' })
  ]
});

function error(message) {
  unhandledLogger.error(message);
}

module.exports = {
  error
};
