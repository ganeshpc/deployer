import logger from '../../logger/winston.config';

import clickhouseLogRepo from '../../repositories/ClickhouseLogRepo';

export const saveLogs = async (
  projectId: String,
  deploymentId: String,
  logMessage: String
) => {
  logger.debug(
    `saving log to database: projectId: ${projectId}, deploymentId: ${deploymentId} logMessage: ${logMessage}`
  );
  try {
    clickhouseLogRepo.saveLogToDatabase(projectId, deploymentId, logMessage);
  } catch (error) {
    logger.error(
      `error saving log to database. projectId: ${projectId}, logMessage: ${logMessage}`,
      error
    );
  }
};
