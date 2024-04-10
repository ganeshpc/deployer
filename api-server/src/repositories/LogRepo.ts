import LogEntry from "../models/LogEntry";

export default interface LogRepo {
  saveLogToDatabase(projectId: String, deploymentId: String, logMessage: String): Promise<void>;

  saveMultipleLogsToDatabse(projectId: String, deploymentId: String, logMessages: String[]): Promise<void>;

  getDeploymentLogs(deploymentId: String): Promise<LogEntry[]>;
}