import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
import helmet from 'helmet';
import cors from 'cors';

import * as validators from './routes/validators';

// routers
import userRouter from './routes/user';
import projectRouter from './routes/project';
import logger from './logger/winston.config';
import UnauthorizedError from './middlewares/UnauthorizedError';
import { authenticated } from './middlewares/auth';

const app = express();

// helmet middleware for security
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(express.json());

app.get('/health', (req, res) => {
  logger.info('GET /health health check');
  return res.json({
    status: 'ok',
  });
});

app.use('/user', userRouter);

app.use('/project', authenticated, projectRouter);

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

// unauthorized error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      status: 'error',
      message: err.message,
    });
  }

  next(err);
});

// final error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('final error handler', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
