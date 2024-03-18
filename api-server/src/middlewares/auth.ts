import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

import UnauthorizedError from './UnAuthorizedError';

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

  //TODO: verify token with jwt
  // const decoded = jwt.verify(authToken, SECRET_KEY);

  next();
};
