import { Result, ValidationError, body } from 'express-validator';


// custom Error class to handle validation errors
export class ValidationErrors extends Error {
  errors: ValidationError[];

  constructor(error: Result<ValidationError>) {
    super('Validation error');
    this.errors = error.array();
    this.name = 'ValidationError';
  }
}

export const createProjectValidators = [
  body('name', 'Invalid project name.').isString().notEmpty().trim(),
  body('gitUrl', 'Invalid git url').isString().notEmpty().trim().isURL(),
  body('customDomain', 'Invalid custom domain name').isString().optional(),
];

export const deployProjectValidators = [
  body('projectId', 'Invalid project id').isString().notEmpty().trim(),
];
