"use server";

import { prisma } from "@/lib/prisma";

export async function updateResumeScore(id: string, score: number) {
  try {
    const resume = await prisma.resume.update({
      where: {
        id: id,
      },
      data: {
        score: score,
      },
    });

    if (resume) return resume;
    return null;
  } catch (error) {
    return null;
  }
}
