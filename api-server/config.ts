import Joi from 'joi';

const environmentSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),

  PORT: Joi.number().default(3000),

  JWT_SECRET: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_CLUSTER_ARN: Joi.string().required(),
  AWS_TASK_DEFINATION_ARN: Joi.string().required(),

  CLICKHOUSE_HOST: Joi.string().required(),
  CLICKHOUSE_DATABASE: Joi.string().required(),
  CLICKHOUSE_USERNAME: Joi.string().required(),
  CLICKHOUSE_PASSWORD: Joi.string().required(),

  KAFKA_BROKER: Joi.string().required(),
  KAFKA_USERNAME: Joi.string().required(),
  KAFKA_PASSWORD: Joi.string().required(),
  KAFKA_CERTIFICATE: Joi.string().required(),
}).unknown(true);

// const { error, value: envVars } = environmentSchema.validate(process.env);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

// export default envVars;


