import bcrypt from 'bcrypt';

import { prisma } from '../../prisma';
import InvalidCredentialsError from './InvalidCredentialsError';
import { generateJwtToken } from './jwt';
import UserError from './UserError';

export const createUser = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  const user = {
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
    username: createdUser.username,
    createdAt: createdUser.createdAt,
    updatedAt: createdUser.updatedAt,
  };

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new UserError(`User with email ${email} does not exist.`);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new InvalidCredentialsError();
  }

  const authToken = generateJwtToken({
    name: user.name,
    email: user.email,
    username: user.username,
    id: user.id,
  });

  const logedInUser = {
    name: user.name,
    email: user.email,
    username: user.username,
    authToken,
  };

  return logedInUser;
};
