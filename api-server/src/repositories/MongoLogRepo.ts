import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb';

import LogRepo from './LogRepo';
import logger from '../logger/winston.config';
import LogEntry from '../models/LogEntry';

const mongoUri = process.env.MONGO_URI as string;
const dbName = process.env.MONGO_DB_NAME as string;
const logCollectionName = process.env.MONGO_LOG_COLLECTION_NAME as string;

class MongoLogRepo implements LogRepo {
  private client: MongoClient;
  private db: Db | undefined;
  private logCollection: Collection<LogEntry> | undefined;

  constructor() {
    if (!mongoUri) {
      throw new Error('MONGO_URI not provided');
    }

    this.client = new MongoClient(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async initializeConnection() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();

      this.db = this.client.db(dbName);

      this.logCollection = this.db.collection(logCollectionName);

      // send the ping to confirm successful connection
      await this.db.command({ ping: 1 });

      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('Error connecting to MongoDB: ', error);
    }
  }

  async saveLogToDatabase(
    projectId: String,
    deploymentId: String,
    logMessage: String
  ): Promise<void> {
    await this.logCollection?.insertOne({
      project_id: projectId,
      deployment_id: deploymentId,
      log: logMessage,
    });
  }

  async saveMultipleLogsToDatabse(
    projectId: String,
    deploymentId: String,
    logMessages: String[]
  ): Promise<void> {
    const logEntries = logMessages.map((log) => ({
      project_id: projectId,
      deployment_id: deploymentId,
      log,
    }));
    await this.logCollection?.insertMany(logEntries);
  }

  async getDeploymentLogs(deploymentId: String): Promise<LogEntry[]> {
    const logs = await this.logCollection
      ?.find({ deployment_id: deploymentId })
      .toArray();

    if (logs) {
      return logs;
    } else {
      return [];
    }
  }
}

export default new MongoLogRepo();
