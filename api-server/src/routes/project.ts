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
} from '../services/project';
import * as validators from './validators';
import ProjectError from '../services/project/ProjectError';

const projectRouter = express.Router();

projectRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`/GET projects created by: ${req.userId}`);

    const creatorId = req.userId as string;

    const projects = await getProjectsByUser(creatorId);

    res.json(projects);
  }
);

projectRouter.get('/:projectId', async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const project = await getProjectById(projectId);

  res.json(project);
});

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

projectRouter.get(
  '/:projectId/deployment',
  async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`/GET deployment for project: ${req.params.projectId}`);
    try {
      const { projectId } = req.params;

      const deployment = await getProjectDeployements(projectId);

      res.json(deployment);
    } catch (error) {
      logger.error('deployment error', error);

      next(error);
    }
  }
);

projectRouter.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ProjectError) {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    next(error);
  }
);

export default projectRouter;
