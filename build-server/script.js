const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { Kafka } = require('kafkajs');

const PROJECT_ID = process.env.PROJECT_ID;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;

const kafka = new Kafka({
  clientId: `build-server-${DEPLOYMENT_ID}`,
  brokers: [
    'db-kafka-blr1-77912-do-user-15981714-0.c.db.ondigitalocean.com:25073',
  ],
  sasl: {
    username: 'doadmin',
    password: 'AVNS_mLZ_u6GTIqomZVnuX3j',
  },
  ssl: {
    ca: fs.readFileSync('./ca-certificate.crt', 'utf-8'),
  },
});

const proudcer = kafka.producer();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const mime = require('mime-types');

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIA2FMJCPZUWS5LVSFR',
    secretAccessKey: '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',
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

    publisher.quit();

    process.exit(0);
  });
}

init();
