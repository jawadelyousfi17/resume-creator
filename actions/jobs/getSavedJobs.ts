"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";

export async function getSavedJobs() {
  const userId = await getUserId();
  if (!userId) return [];

  const jobs = await prisma.job.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return jobs;
}
