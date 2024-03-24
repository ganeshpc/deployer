/*
  Warnings:

  - Added the required column `creator_id` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "creator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "app_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
