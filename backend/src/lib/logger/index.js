import winston from 'winston'

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    // defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `debug` or less to `main.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'main.log' }),
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    ],
  });