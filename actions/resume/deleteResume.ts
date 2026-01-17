"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
  try {
    const resume = await prisma.resume.delete({
      where: {
        id: id,
      },
    });

    if (resume) {
      revalidatePath("/app/resumes");
      return resume;
    }
    return null;
  } catch (error) {
    console.error("Error deleting resume:", error);
    return null;
  }
}
