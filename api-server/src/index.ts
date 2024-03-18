import dotenv from 'dotenv';
dotenv.config();

import logger from './logger/winston.config';
import app from './app';
// import { initKafka } from './kafka';

const PORT = process.env.PORT ?? 9000;

const main = async () => {
  try {
    // await initKafka();

    app.listen(PORT, () => {
      logger.info(`api server listening on port: ${PORT}`);
    });
  } catch (error) {
    logger.error('error starting server', error);
    process.exit(1);
  }
};

main();
