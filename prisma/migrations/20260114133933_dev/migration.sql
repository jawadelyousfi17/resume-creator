/*
  Warnings:

  - The `template` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "template",
ADD COLUMN     "template" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "TEMPLATE";
