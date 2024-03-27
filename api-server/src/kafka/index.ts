import fs from 'fs';
import path from 'path';

import logger from '../logger/winston.config';

import { Kafka } from 'kafkajs';

import { saveLogToDatabase } from '../services/deployment';

import * as projectService from '../services/project';

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

const logConsumer = kafka.consumer({
  groupId: 'api-server-logs-consumer',
});

const deploymentStatusConsumer = kafka.consumer({
  groupId: 'api-server-deployment-status-consumer',
});

export const initKafka = async () => {
  await logConsumer.connect();
  await logConsumer.subscribe({ topics: ['container-logs'] });

  await deploymentStatusConsumer.connect();
  await deploymentStatusConsumer.subscribe({ topics: ['deployment_status'] });

  await logConsumer.run({
    eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
      logger.debug('message batch received');

      batch.messages.forEach(async (message) => {
        const stringMessage = message.value?.toString();

        if (stringMessage !== undefined) {
          const { PROJECT_ID, DEPLOYMENT_ID, log } = JSON.parse(stringMessage);

          saveLogToDatabase(PROJECT_ID, DEPLOYMENT_ID, log);

          resolveOffset(message.offset);
          await heartbeat();
        }
      });
    },
  });

  await deploymentStatusConsumer.run({
    eachMessage: async ({ message }) => {
      const stringMessage = message.value?.toString();

      logger.debug('deployment status message received: ', stringMessage);

      if (stringMessage !== undefined) {
        const { PROJECT_ID, DEPLOYMENT_ID, status } = JSON.parse(stringMessage);

        projectService.setDeploymentStatus(DEPLOYMENT_ID, status);
      }
    },
  });

  logger.info('kafka connection successful');
};
