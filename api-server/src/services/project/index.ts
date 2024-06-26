import { DeploymentStatus } from '@prisma/client';

import logger from '../../logger/winston.config';
import * as aws from '../../aws';
import { prisma } from '../../prisma';
import ProjectError from './ProjectError';
// import client from '../../clickhouse';
import mongoLogRepo from '../../repositories/MongoLogRepo';

export const getProjectById = async (projectId: string) => {
  logger.info(`Getting project with id ${projectId}`);

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    logger.info(`Project not found with id ${projectId}`);
    throw new ProjectError(`Project not found with id ${projectId}`);
  }

  return project;
};

export const getProjectsByUser = async (userId: string) => {
  logger.info(`Getting projects for user ${userId}`);

  const projects = await prisma.project.findMany({
    where: {
      creatorId: userId,
    },
  });

  return projects;
};

export const createProject = async (
  name: string,
  creatorId: string,
  gitUrl: string,
  subdomain: string,
  customDomain?: string
) => {
  logger.info(`Creating project ${name}`);

  const project = await prisma.project.create({
    data: {
      name,
      gitUrl,
      customDomain,
      creator: { connect: { id: creatorId } },
      subdomain,
    },
  });

  return project;
};

export const deployProject = async (projectId: string) => {
  // check if project exists
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    logger.info(`Project not found with id ${projectId}`);
    throw new ProjectError(`Project not found with id ${projectId}`);
  }

  // check if there is already running deployment
  const runningDeployment = await prisma.deployment.findFirst({
    where: {
      projectId,
      AND: [
        { status: DeploymentStatus.QUEUED },
        { status: DeploymentStatus.IN_PROGRESS },
      ],
    },
  });

  if (runningDeployment) {
    logger.info(`Deployment already running for project ${projectId}`);
    throw new ProjectError(
      `Deployment already running for project: ${projectId}`
    );
  }

  // TODO: improve promise handling
  const deployment = await prisma.deployment.create({
    data: {
      project: { connect: { id: projectId } },
      status: DeploymentStatus.QUEUED,
    },
  });

  await aws.buildProject(project.id, project.gitUrl, deployment.id);

  return deployment;
};

export const getProjectDeployements = async (projectId: string) => {
  const deployments = await prisma.deployment.findMany({
    where: {
      projectId,
    },
  });

  return deployments;
};

export const getDeployement = async (deploymentId: string) => {
  const deployment = await prisma.deployment.findUnique({
    where: {
      id: deploymentId,
    },
  });

  return deployment;
};

export const getDeploymentLogs = async (deploymentId: string) => {
  const logs = mongoLogRepo.getDeploymentLogs(deploymentId);

  return logs;
};

export const setDeploymentStatus = async (
  deploymentId: string,
  deploymentStatus: DeploymentStatus
) => {
  const updatedDeployment = await prisma.deployment.update({
    where: {
      id: deploymentId,
    },
    data: {
      status: deploymentStatus,
    },
  });

  return updatedDeployment;
};
