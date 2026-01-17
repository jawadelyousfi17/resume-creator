-- CreateEnum
CREATE TYPE "TEMPLATE" AS ENUM ('classic', 'colorful');

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "template" "TEMPLATE" NOT NULL DEFAULT 'classic';
