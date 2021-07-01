const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;
const LEVEL = Symbol.for('level');

module.exports = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`
  })

  function filterOnly(level) {
    return format(function (info) {
      if (info[LEVEL] === level) {
        return info;
      }
    })();
  }

  return createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [
      new transports.Console({ format: format.colorize({ all: true }) }),
      new transports.File({
        filename: './src/logger/dev-logs/info.log', level: 'info',
        format: filterOnly('info')
      }),
      new transports.File({
        filename: './src/logger/dev-logs/warn.log', level: 'warn',
        format: filterOnly('warn')
      }),
      new transports.File({ filename: './src/logger/dev-logs/error.log', level: 'error' }),
      new transports.File({ filename: './src/logger/dev-logs/combined.log' })
    ]
  })
}