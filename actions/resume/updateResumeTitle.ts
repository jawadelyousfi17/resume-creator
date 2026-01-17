"use server";

import { prisma } from "@/lib/prisma";

export async function updateResumeTitle(id: string, newTitle: string) {
  try {
    const resume = await prisma.resume.update({
      where: {
        id: id,
      },
      data: {
        name: newTitle,
      },
    });

    if (resume) return resume;
    return null;
  } catch (error) {
    return null;
  }
}
