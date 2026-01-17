"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateResumeTemplate(id: string, templateId: number) {
  try {
    const resume = await prisma.resume.update({
      where: {
        id: id,
      },
      data: {
        template: templateId,
      },
    });

    revalidatePath("/app/resumes/create");
    if (resume) return resume;
    return null;
  } catch (error) {
    return null;
  }
}
