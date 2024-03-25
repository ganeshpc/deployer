import fs from 'fs';
import path from 'path';

import logger from '../logger/winston.config';

import { Kafka } from 'kafkajs';
import { v4 as uuid } from 'uuid';

import clickHouseClient from '../clickhouse';

const broker = process.env.KAFKA_BROKER as string;
const username = process.env.KAFKA_USERNAME as string;
const password = process.env.KAFKA_PASSWORD as string;
const certificate = process.env.KAFKA_CERTIIATE as string;

const kafka = new Kafka({
  clientId: 'api-server',
  brokers: [broker],
  sasl: {
    mechanism: 'plain',
    username,
    password,
  },
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, certificate), 'utf-8'),
  },
});

export const logConsumer = kafka.consumer({
  groupId: 'api-server-logs-consumer',
});

export const initKafka = async () => {
  await logConsumer.connect();
  await logConsumer.subscribe({ topics: ['container-logs'] });

  await logConsumer.run({
    eachBatch: async ({
      batch,
      heartbeat,
      commitOffsetsIfNecessary,
      resolveOffset,
    }) => {
      const messages = batch.messages.map((message) => {
        return message.value?.toString();
      });

      logger.debug('received messages', messages);

      for (const message of messages) {
        if (message !== undefined) {
          const { PROJECT_ID, DEPLOYMENT_ID, log } = JSON.parse(message);

          clickHouseClient.insert({
            table: 'log_events',
            values: [{ event_id: uuid(), deployment_id: DEPLOYMENT_ID, log }],
            format: 'JSONEachRow',
          });
        }
      }

      
    },
  });

  logger.info('kafka connection successful');
};
