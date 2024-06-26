import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { generateSlug } from 'random-word-slugs';

import logger from '../logger/winston.config';
import {
  createProject,
  deployProject,
  getProjectById,
  getProjectDeployements,
  getProjectsByUser,
  getDeploymentLogs,
  getDeployement,
} from '../services/project';
import * as validators from './validators';
import ProjectError from '../services/project/ProjectError';

const projectRouter = express.Router();

/**
 * Get all projects created by the user
 */
projectRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`/GET projects created by: ${req.userId}`);

    const creatorId = req.userId as string;

    const projects = await getProjectsByUser(creatorId);

    res.json(projects);
  }
);

/**
 * Get project by id
 */
projectRouter.get('/:projectId', async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const project = await getProjectById(projectId);

  res.json(project);
});

/**
 * Create a new project
 */
projectRouter.post(
  '/',
  validators.createProjectValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`/POST create project: ${req.body.name}`);

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return next(new validators.ValidationErrors(validationErrors));
    }

    const { name, gitUrl, customDomain } = req.body;

    const userId = req.userId as string;

    logger.debug(`Creating project with name: ${name} by user: ${userId}`);

    const subdomain = generateSlug();

    const project = await createProject(
      name,
      userId,
      gitUrl,
      subdomain,
      customDomain
    );

    res.json(project);
  }
);

/**
 * This route will create a new deployment for the project
 */
projectRouter.post(
  '/deploy',
  validators.deployProjectValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return next(new validators.ValidationErrors(validationErrors));
    }

    try {
      const { projectId } = req.body;

      // create project and start deployment
      const deployment = await deployProject(projectId);

      return res.json(deployment);
    } catch (error) {
      logger.error('deploy error', error);

      return next(error);
    }
  }
);

/**
 * Get all deployments for a project
 */
projectRouter.get(
  '/:projectId/deployment',
  async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`/GET deployment for project: ${req.params.projectId}`);
    try {
      const { projectId } = req.params;

      const deployments = await getProjectDeployements(projectId);

      res.json(deployments);
    } catch (error) {
      logger.error('deployment error', error);

      next(error);
    }
  }
);

/**
 * Get deployment by id
 */
projectRouter.get(
  '/deployment/:deploymentId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug(`/GET deployment: ${req.params.deploymentId}`);
      const { deploymentId } = req.params;

      const deployment = await getDeployement(deploymentId);

      res.json(deployment);
    } catch (error) {
      logger.error('deployment error', error);

      next(error);
    }
  }
);

/**
 * Get logs for a deployment
 */
projectRouter.get(
  '/logs/:deploymentId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug(`/GET logs for deployment: ${req.params.deploymentId}`);
      const { deploymentId } = req.params;

      const logs = await getDeploymentLogs(deploymentId);

      res.json(logs);
    } catch (error) {
      logger.info('logs error', error);

      next(error);
    }
  }
);

/**
 * Error handler for project routes handles ProjectError
 */
projectRouter.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ProjectError) {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    next(error);
  }
);

export default projectRouter;
