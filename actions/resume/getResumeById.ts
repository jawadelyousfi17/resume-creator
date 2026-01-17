"use server";

import prisma from "@/lib/prisma";

export async function getResumeById(id: string) {
  try {
    const resume = await prisma.resume.findUnique({
      where: {
        id: id,
      },
    });

    if (!resume) null;
    return resume;
  } catch (error) {
    return null;
  }
}
