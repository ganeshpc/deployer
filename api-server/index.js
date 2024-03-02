const express = require('express');
const { generateSlug } = require('random-word-slugs');
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs');

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
  const projectSlug = generateSlug();
  const { gitUrl } = req.body;

  //spin the container
  const command = new RunTaskCommand({
    cluster: awsConfig.CLUSTER,
    taskDefinition: awsConfig.TASK,
    launchType: 'FARGATE',
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [
          'subnet-0ae4d542993323b52'
        ],
        securityGroups: ['sg-070fb120664ec8237'],
        assignPublicIp: "ENABLED"
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
    }
  });
});

app.listen(PORT, () => {
  console.log(`api server listening on port: ${PORT}`);
});
