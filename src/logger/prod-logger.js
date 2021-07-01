const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json } = format;
const LEVEL = Symbol.for('level');

module.exports = () => {
  function filterOnly(level) {
    return format(function (info) {
      if (info[LEVEL] === level) {
        return info;
      }
    })();
  }

  return createLogger({
    format: combine(
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console({ format: format.colorize({ all: true }) }),
      new transports.File({
        filename: './src/logger/prod-logs/info.log', level: 'info',
        format: filterOnly('info')
      }),
      new transports.File({
        filename: './src/logger/prod-logs/warn.log', level: 'warn',
        format: filterOnly('warn')
      }),
      new transports.File({ filename: './src/logger/prod-logs/error.log', level: 'error' }),
      new transports.File({ filename: './src/logger/prod-logs/combined.log' })
    ]
  })
}