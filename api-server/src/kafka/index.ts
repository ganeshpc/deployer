import fs from 'fs';
import path from 'path';

import { Kafka } from 'kafkajs';

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

const consumer = kafka.consumer({ groupId: 'api-server-logs-consumer' });

export const initKafka = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: ['container-logs'] });

  console.log('kafka connection successful');
};
