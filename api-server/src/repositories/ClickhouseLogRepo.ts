import { v4 as uuid } from 'uuid';

import clickhouseClient from '../clickhouse';
import LogRepo from './LogRepo';

class ClickhouseLogRepo implements LogRepo {
  async saveLogToDatabase(
    projectId: String,
    deploymentId: String,
    logMessage: String
  ): Promise<void> {
    clickhouseClient.insert({
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
  }
}

export default new ClickhouseLogRepo();
