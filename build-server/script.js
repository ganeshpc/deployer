const dotenv = require('dotenv');
dotenv.config();

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const mime = require('mime-types');
const redis = require('./message-queue/Redis');

const PROJECT_ID = process.env.PROJECT_ID;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const publishDeploymentStatus = async (status) => {
  redis.publishDeploymentStatus({
    PROJECT_ID,
    DEPLOYMENT_ID,
    status,
  });
};

const publishLog = async (log) => {
  redis.publishLog({
    PROJECT_ID,
    DEPLOYMENT_ID,
    log,
  });
};

async function init() {
  publishDeploymentStatus('IN_PROGRESS');

  console.log('Executing script.js');
  publishLog('build started...');

  const outDir = path.join(__dirname, 'output');

  console.log('Rnning npm install and build...');
  publishLog('Rnning npm install and build...');

  const cp = exec(`cd ${outDir} && npm install && npm run build`);

  cp.stdout.on('data', function (data) {
    console.log(data.toString());
    publishLog(data.toString());
  });

  cp.stdout.on('error', function (error) {
    console.log(error.toString());
    publishLog(error.toString());
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
    publishLog('files uploaded...');

    publishDeploymentStatus('COMPLETED');

    await proudcer.disconnect();

    process.exit(0);
  });
}

init();
