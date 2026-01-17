"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Activates a resume by setting its active status to true.
 * @param id - The ID of the resume to activate.
 * @returns The updated resume or null if failed.
 */
export async function activateResume(id: string) {
  try {
    const resume = await prisma.resume.update({
      where: {
        id: id,
      },
      data: {
        active: true,
      },
    });

    revalidatePath("/app/resumes");
    return resume;
  } catch (error) {
    console.error("Error activating resume:", error);
    return null;
  }
}
