import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

export const generateJwtToken = (payload: object) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

  return token;
};
