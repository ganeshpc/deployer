import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initKafka } from './kafka';


const PORT = process.env.PORT ?? 9002;

const main = async () => {
  try {
    await initKafka();

    app.listen(PORT, () => {
      console.log(`api server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error('error starting server', error);
    process.exit(1);
  }
};

main();
