import { Redis } from 'ioredis';

import logger from '../logger/winston.config';
import { saveLogs } from '../services/deployment';
import * as projectService from '../services/project';

const host = process.env.REDIS_HOST as string;
const port = parseInt(process.env.REDIS_PORT as string);
const username = process.env.REDIS_USERNAME as string;
const password = process.env.REDIS_PASSWORD as string;

const logChannleName = process.env.REDIS_LOG_CHANNEL as string;
const deploymentStatusChannelName = process.env
  .REDIS_DEPLOYMENT_STATUS_CHANNEL as string;

export const initRedis = () => {
  return new Promise<void>((resolve, reject) => {
    logger.info(
      `Connecting to redis... with host: ${host}, port: ${port}, username: ${username}`
    );
    const redis = new Redis({
      host,
      port,
      username,
      password,
      tls: { rejectUnauthorized: false },
    });

    redis.on('connect', () => {
      logger.info('Connection to redis susccessful');
    });

    redis.on('error', (err) => {
      logger.error('Failed to connect to redis: ', err);
      reject(err);
    });

    redis.subscribe(
      logChannleName,
      deploymentStatusChannelName,
      (err, count) => {
        if (err) {
          logger.error('Failed to subscribe to deployment-status: ', err);
          reject(err);
        } else {
          logger.info(`Subscribed to ${count} channels`);
          resolve();
        }
      }
    );

    redis.on('message', (channel, message) => {
      const parsedMessage = JSON.parse(message);

      switch (channel) {
        case logChannleName:
          logger.debug(`Received log message: ${message}`);

          saveLogs(
            parsedMessage.PROJECT_ID,
            parsedMessage.DEPLOYMENT_ID,
            parsedMessage.log
          );

          break;
        case deploymentStatusChannelName:
          logger.debug(`Received deployment status message: ${message}`);

          projectService.setDeploymentStatus(
            parsedMessage.DEPLOYMENT_ID,
            parsedMessage.status
          );

          break;
        default:
          logger.error(`Received message from unknown channel: ${channel}`);
      }
    });
  });
};
