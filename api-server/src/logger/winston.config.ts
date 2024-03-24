import { Logger, createLogger, format, transports } from 'winston';

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

const logger: Logger = createLogger({
  level: logLevel, 
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.json(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

logger.info('logger initialized');

export default logger;
