import express, { Request, Response, NextFunction } from 'express';

import { ValidationError, validationResult } from 'express-validator';
import { generateSlug } from 'random-word-slugs';

import dotenv from 'dotenv';
dotenv.config();

import { initializeRedis } from './redis';
import { createProject, deployProject } from './services/project';
import * as validators from './validators';

initializeRedis();

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
  });
});

app.post(
  '/project',
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

app.post(
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

// validation error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof validators.ValidationErrors) {
    return res.status(400).json({
      status: 'error',
      errors: error.errors.map((error: ValidationError) => ({
        message: error.msg,
      })),
    });
  }

  next(error);
});

// final error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('final error handler', err);
  return res.status(500).json({
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`api server listening on port: ${PORT}`);
});
