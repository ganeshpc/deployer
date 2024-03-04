class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

export default InvalidCredentialsError;