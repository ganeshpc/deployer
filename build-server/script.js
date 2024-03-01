const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const mime = require('mime-types');

const s3Client = S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIA2FMJCPZUTEUJ3KWV',
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

    for (const filePath of distDirContent) {
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log('uploading...', filePath);

      const command = new PutObjectCommand({
        Bucket: 'vercel-clone-output',
        Key: `__output/${PROJECT_ID}/${filePath}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime(filePath),
      });

      await s3Client.send(command);

      console.log('uploaded', filePath);
    }
    console.log('done...');
  });
}
