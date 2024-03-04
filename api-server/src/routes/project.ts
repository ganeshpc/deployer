import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { generateSlug } from 'random-word-slugs';

import { createProject, deployProject } from '../services/project';
import * as validators from '../validators';

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

    res.json({ status: 'success', project });
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

      const deployment = await deployProject(projectId);

      return res.json({
        status: 'success',
        deployment,
      });
    } catch (error) {
      console.log('deploy error', error);

      return next(error);
    }
  }
);

export default projectRouter;
