const MessageQueue = require('./MessageQueue');

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;
const KAFKA_CERTIFICATE = process.env.KAFKA_CERTIFICATE;

class Kafka extends MessageQueue {
  constructor() {
    super();
    // connect to kafka
    this.kafka = new Kafka({
      clientId: `build-server-${DEPLOYMENT_ID}`,
      brokers: [KAFKA_BROKER],
      sasl: {
        username: KAFKA_USERNAME,
        password: KAFKA_PASSWORD,
        mechanism: 'plain',
      },
      ssl: {
        ca: fs.readFileSync(`./${KAFKA_CERTIFICATE}`, 'utf-8'),
      },
    });

    this.proudcer = kafka.producer();
  }

  async publishLog(message) {
    await this.proudcer.send({
      topic: 'container-logs',
      messages: [
        {
          key: 'log',
          value: JSON.stringify({ PROJECT_ID, DEPLOYMENT_ID, log }),
        },
      ],
    });
  }

  async publishDeploymentStatus(message) {
    await this.proudcer.send({
      topic: 'deployment_status',
      messages: [
        {
          key: 'status',
          value: JSON.stringify({ PROJECT_ID, DEPLOYMENT_ID, status }),
        },
      ],
    });
  }
}
