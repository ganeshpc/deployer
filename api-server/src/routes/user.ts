import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import {
  ValidationErrors,
  createUserValidators,
  loginValidators,
} from './validators';
import { createUser, login } from '../services/user';
import InvalidCredentialsError from '../services/user/InvalidCredentialsError';
import logger from '../logger/winston.config';
import UserError from '../services/user/UserError';

const router = express.Router();

router.post(
  '/',
  createUserValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /user');

    // if validation fails, it will throw a ValidationError
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ValidationErrors(errors));
    }

    try {
      // create user
      const { name, username, email, password } = req.body;
      const user = await createUser(name, username, email, password);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  loginValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`POST /user/login {email: ${req.body.email}}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationErrors(errors));
    }

    try {
      const { email, password } = req.body;
      const user = await login(email, password);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', (req: Request, res: Response) => {
  logger.info('POST /user/logout');

  //TODO: implement logout (for now, just return success status)
  // save the jwt token on login and then delete it on logout

  res.json({ status: 'success' });
});

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof InvalidCredentialsError) {
    logger.info('Invalid credentials', { error });

    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials',
    });
  }

  if (error instanceof UserError) {
    logger.info('User error', { error });

    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  next(error);
});

export default router;
