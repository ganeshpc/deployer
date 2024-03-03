const express = require('express');
const { generateSlug } = require('random-word-slugs');
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs');

const socket = require('socket.io');
const Redis = require('ioredis');

const subscriber = new Redis(
  'rediss://default:AVNS_WGvAmK0zHF-EdxNZUXj@redis-1e9a5741-vercel-clone-proj.a.aivencloud.com:18238'
);

const socketServer = new socket.Server({ cors: '*' });

socketServer.on('connection', (clientSocket) => {
  console.log('Connection on socket server from: ', clientSocket.id);
  clientSocket.on('subscribe', (channel) => {
    console.log('Subscribing to channel: ', channel);
    clientSocket.join(channel);
    clientSocket.emit('message', `Joined ${clientSocket}`);
  });
});

socketServer.listen(9001, () => {
  console.log('socket server listening on port: 9001');
});

const PORT = process.env.PORT || 9000;
const BASE_PATH =
  'https://vercel-bucket-output.s3.ap-south-1.amazonaws.com/__output';

const awsConfig = {
  CLUSTER: 'arn:aws:ecs:ap-south-1:698756529769:cluster/build-server-cluster',
  TASK: 'arn:aws:ecs:ap-south-1:698756529769:task-definition/builder-running-image-in-cluster-task:1',
};

const ecsClient = new ECSClient({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIA2FMJCPZUWS5LVSFR',
    secretAccessKey: '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',
  },
});

const app = express();

app.use(express.json());

app.post('/project', async (req, res) => {
  const { gitUrl, slug } = req.body;

  const projectSlug = slug ? slug : generateSlug();

  //spin the container
  const command = new RunTaskCommand({
    cluster: awsConfig.CLUSTER,
    taskDefinition: awsConfig.TASK,
    launchType: 'FARGATE',
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: ['subnet-0ae4d542993323b52'],
        securityGroups: ['sg-070fb120664ec8237'],
        assignPublicIp: 'ENABLED',
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: 'builder-image-in-task-container',
          environment: [
            {
              name: 'PROJECT_ID',
              value: projectSlug,
            },
            {
              name: 'GIT_REPOSITORY__URL',
              value: gitUrl,
            },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);

  return res.json({
    status: 'queued',
    data: {
      projectSlug,
      url: `http://${projectSlug}.localhost:8000`,
    },
  });
});

async function initRedisSubscribe() {
  console.log('Subscribing to logs...');
  subscriber.psubscribe('logs:*');
  subscriber.on('pmessage', (pattern, channel, message) => {
    socketServer.to(channel).emit('message', message);
  });
}

initRedisSubscribe();

app.listen(PORT, () => {
  console.log(`api server listening on port: ${PORT}`);
});
