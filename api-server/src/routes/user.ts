import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import {
  ValidationErrors,
  createUserValidators,
  loginValidators,
} from './validators';
import { createUser, login } from '../services/user';
import InvalidCredentialsError from '../services/user/InvalidCredentialsError';

const router = express.Router();

router.post(
  '/',
  createUserValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    // if validation fails, it will throw a ValidationError
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ValidationErrors(errors));
    }

    try {
      // create user
      const { name, username, email, password } = req.body;
      const user = await createUser(name, username, email, password);

      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  loginValidators,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationErrors(errors));
    }

    try {
      const { email, password } = req.body;
      const user = await login(email, password);

      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof InvalidCredentialsError) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials',
    });
  }

  next(error);
});

export default router;
