import { v4 as uuid } from 'uuid';

import logger from '../../logger/winston.config';
import clickHouseClient from '../../clickhouse';

export const saveLogToDatabase = async (
  projectId: String,
  deploymentId: String,
  logMessage: String
) => {
  logger.debug(
    `saving log to database: projectId: ${projectId}, deploymentId: ${deploymentId} logMessage: ${logMessage}`
  );
  try {
    clickHouseClient.insert({
      table: 'log_events',
      values: [
        {
          event_id: uuid(),
          project_id: projectId,
          deployment_id: deploymentId,
          log: logMessage,
        },
      ],
      format: 'JSONEachRow',
    });
  } catch (error) {
    logger.error(
      `error saving log to database. projectId: ${projectId}, logMessage: ${logMessage}`,
      error
    );
  }
};
