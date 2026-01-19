-- CreateEnum
CREATE TYPE "JOB_STATUS" AS ENUM ('saved', 'applied', 'interview', 'offer', 'rejected');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "JOB_STATUS" NOT NULL DEFAULT 'saved',

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
