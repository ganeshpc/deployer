// import jwt from 'jsonwebtoken';

export const generateJwtToken = (payload: object) => {
  // TODO: implement jwt token generation

  // Token generation
  //   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Expires in 1 hour

  return JSON.stringify(payload);
};
