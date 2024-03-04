import bcrypt from 'bcrypt';

import { prisma } from '../prisma';
import InvalidCredentialsError from './InvalidCredentialsError';

export const createUser = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new InvalidCredentialsError();
  }

  return user;
};
