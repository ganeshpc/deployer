import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import UnauthorizedError from './UnauthorizedError';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('No authorization header present');
  }

  const authToken = authHeader.split(' ')[1];

  if (!authToken) {
    throw new UnauthorizedError('No authToken present');
  }

  try {
    const decoded = jwt.verify(authToken, SECRET_KEY);

    if (typeof decoded === 'object' && 'id' in decoded) {
      req.userId = decoded.id;
    } else {
      throw new UnauthorizedError('Invalid authToken');
    }
  } catch (error) {
    throw new UnauthorizedError('Invalid authToken');
  }

  next();
};
