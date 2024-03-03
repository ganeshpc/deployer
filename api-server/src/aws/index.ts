import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs';

const awsConfig = {
  CLUSTER: process.env.AWS_CLUSTER_ARN || '',
  TASK: process.env.AWS_TASK_DEFINATION_ARN || '',
};

const ecsClient = new ECSClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export const buildProject = async (projectId: string, gitRepoUrl: string) => {
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
              value: projectId,
            },
            {
              name: 'GIT_REPOSITORY__URL',
              value: gitRepoUrl,
            },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);
};
