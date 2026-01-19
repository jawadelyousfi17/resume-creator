"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";
import { revalidatePath } from "next/cache";

export async function saveJob({
  jobId,
  title,
  description,
}: {
  jobId: string;
  title: string;
  description: string;
}) {
  const userId = await getUserId();
  if (!userId) return { error: "User not found" };

  try {
    // Check if job already saved by this user
    const existingJob = await prisma.job.findFirst({
      where: {
        userId,
        jobId,
      },
    });

    if (existingJob) {
      return { message: "Job already saved", job: existingJob };
    }

    const savedJob = await prisma.job.create({
      data: {
        jobId,
        title,
        Description: description,
        userId: userId,
      },
    });

    revalidatePath("/app/jobs/saved");
    return { success: true, job: savedJob };
  } catch (error) {
    console.error("Error saving job:", error);
    return { error: "Failed to save job" };
  }
}
