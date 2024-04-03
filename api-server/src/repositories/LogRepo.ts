export default interface LogRepo {
  saveLogToDatabase(projectId: String, deploymentId: String, logMessage: String): Promise<void>;
}