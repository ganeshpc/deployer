const dotenv = require('dotenv');
dotenv.config();

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Kafka } = require('kafkajs');
const mime = require('mime-types');

const PROJECT_ID = process.env.PROJECT_ID;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;
const KAFKA_CERTIFICATE = process.env.KAFKA_CERTIFICATE;

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// connect to kafka
const kafka = new Kafka({
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

const proudcer = kafka.producer();

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const publishLog = async (log) => {
  await proudcer.send({
    topic: 'container-logs',
    messages: [
      { key: 'log', value: JSON.stringify({ PROJECT_ID, DEPLOYMENT_ID, log }) },
    ],
  });
};

async function init() {
  await proudcer.connect();

  console.log('Executing script.js');

  publishLog('build started...');

  const outDir = path.join(__dirname, 'output');

  const cp = exec(`cd ${outDir} && npm install && npm run build`);

  cp.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  cp.stdout.on('error', function (error) {
    console.log(error.toString());
  });

  cp.on('close', async function () {
    console.log('build complete!');

    console.log(`uploading files to s3: __output/${PROJECT_ID}`);

    publishLog('build complete...');

    const distDir = path.join(__dirname, 'output', 'dist');

    const distDirContent = fs.readdirSync(distDir, { recursive: true });

    for (const file of distDirContent) {
      const filePath = path.join(distDir, file);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log('uploading...', filePath);

      publishLog(`uploading ${filePath}`);

      const command = new PutObjectCommand({
        Bucket: 'vercel-bucket-output',
        Key: `__output/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath),
      });

      await s3Client.send(command);

      console.log('uploaded', filePath);

      publishLog(`uploaded ${filePath}`);
    }
    console.log('done...');

    publishLog('build complete');

    await proudcer.disconnect();

    process.exit(0);
  });
}

init();
