const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const mime = require('mime-types');

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIA2FMJCPZUWS5LVSFR',
    secretAccessKey: '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',
  },
});

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
  console.log('Executing script.js');

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

      const command = new PutObjectCommand({
        Bucket: 'vercel-bucket-output',
        Key: `__output/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath),
      });

      await s3Client.send(command);

      console.log('uploaded', filePath);
    }
    console.log('done...');
  });
}

init();