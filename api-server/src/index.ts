import dotenv from 'dotenv';
dotenv.config();

import logger from './logger/winston.config';
import app from './app';
import { initRedis } from './redis';

const PORT = process.env.PORT ?? 9000;

const main = async () => {
  try {
    logger.info('starting api-server...');

    await initRedis();

    app.listen(PORT, () => {
      logger.info(`api server listening on port: ${PORT}`);
    });
  } catch (error) {
    logger.error('error starting server', error);
    process.exit(1);
  }
};

main();
