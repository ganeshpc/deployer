import { v4 as uuid } from 'uuid';

import clickhouseClient from '../clickhouse';
import LogRepo from './LogRepo';
import LogEntry from '../models/LogEntry';

class ClickhouseLogRepo implements LogRepo {
  async getDeploymentLogs(deploymentId: String): Promise<LogEntry[]> {
    const logs = await clickhouseClient.query({
      query:
        'SELECT event_id, log, timestamp FROM log_events WHERE deployment_id = {deploymentId:String}',
      query_params: {
        deploymentId,
      },
      format: 'JSONEachRow',
    });

    const rawLogs = await logs.json();

    return [];
  }
  saveMultipleLogsToDatabse(
    projectId: String,
    deploymentId: String,
    logMessages: String[]
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

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
