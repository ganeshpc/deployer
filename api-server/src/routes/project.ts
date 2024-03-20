import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { generateSlug } from 'random-word-slugs';

import logger from '../logger/winston.config';
import { createProject, deployProject } from '../services/project';
import * as validators from './validators';
import ProjectError from '../services/project/ProjectError';

const projectRouter = express.Router();

projectRouter.post(
  '/',
  validators.createProjectValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return next(new validators.ValidationErrors(validationErrors));
    }

    const { name, gitUrl, customDomain } = req.body;

    const subdomain = generateSlug();

    const project = await createProject(name, gitUrl, subdomain, customDomain);

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

projectRouter.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ProjectError) {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    next(error);
  }
);

export default projectRouter;
