const { Redis } = require('ioredis');

const MessageQueue = require('./MessageQueue');

const host = 'redis-1e9a5741-vercel-clone-proj.a.aivencloud.com';
const port = 18238;
const username = 'default';
const password = 'AVNS_WGvAmK0zHF-EdxNZUXj';

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
    });
  }

  publishLog(message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }

    this.redis.publish(REDIS_LOG_CHANNEL, message);
  }

  publishDeploymentStatus(message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }

    this.redis.publish(REDIS_DEPLOYMENT_STATUS_CHANNEL, message);
  }
}

module.exports = new RedisMQ();
