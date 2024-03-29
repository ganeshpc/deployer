/*
  Warnings:

  - The values [NOT_STARTED,READY] on the enum `DeploymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeploymentStatus_new" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');
ALTER TABLE "deployment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "deployment" ALTER COLUMN "status" TYPE "DeploymentStatus_new" USING ("status"::text::"DeploymentStatus_new");
ALTER TYPE "DeploymentStatus" RENAME TO "DeploymentStatus_old";
ALTER TYPE "DeploymentStatus_new" RENAME TO "DeploymentStatus";
DROP TYPE "DeploymentStatus_old";
ALTER TABLE "deployment" ALTER COLUMN "status" SET DEFAULT 'QUEUED';
COMMIT;

-- AlterTable
ALTER TABLE "deployment" ALTER COLUMN "status" SET DEFAULT 'QUEUED';
