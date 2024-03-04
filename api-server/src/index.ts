import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
import helmet from 'helmet';

import dotenv from 'dotenv';
dotenv.config();

import { initializeRedis } from './redis';
import * as validators from './routes/validators';
import projectRouter from './routes/project';

initializeRedis();

const PORT = process.env.PORT ?? 9002;

const app = express();

// helmet middleware for security
app.use(helmet());

app.use(express.json());

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
  });
});

app.use('/project', projectRouter);

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
