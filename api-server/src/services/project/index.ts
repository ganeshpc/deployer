import { DeploymentStatus } from '@prisma/client';

import * as aws from '../../aws';
import { prisma } from '../../prisma';

export const createProject = async (
  name: string,
  gitUrl: string,
  subdomain: string,
  customDomain?: string
) => {
  const project = await prisma.project.create({
    data: {
      name,
      gitUrl,
      customDomain,
      subdomain,
    },
  });

  return project;
};

export const deployProject = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  // TODO: improve promise handling
  const deployment = await prisma.deployment.create({
    data: {
      projectId,
      status: DeploymentStatus.QUEUED,
    },
  });

  await aws.buildProject(project.id, project.gitUrl, deployment.id);

  return deployment;
};
