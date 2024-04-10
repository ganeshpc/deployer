const { Redis } = require('ioredis');

const MessageQueue = require('./MessageQueue');

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;

const REDIS_LOG_CHANNEL = process.env.REDIS_LOG_CHANNEL;
const REDIS_DEPLOYMENT_STATUS_CHANNEL =
  process.env.REDIS_DEPLOYMENT_STATUS_CHANNEL;

class RedisMQ extends MessageQueue {
  constructor() {
    super();
    this.redis = new Redis({
      host,
      port,
      username,
      password,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  initializeConnection() {
    return new Promise((resolve, reject) => {
      this.redis.on('connect', () => {
        console.log('Connection to redis successful');
        resolve();
      });

      this.redis.on('error', (error) => {
        console.error('Error connecting to redis', error);
        reject(error);
      });
    });
  }

  publishLog(message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }

    console.log('publishing log', message);

    this.redis.publish(REDIS_LOG_CHANNEL, message);
  }

  async publishDeploymentStatus(message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }

    console.log('publishing deployment status', message);

    await this.redis.publish(REDIS_DEPLOYMENT_STATUS_CHANNEL, message);
  }
}

module.exports = new RedisMQ();
