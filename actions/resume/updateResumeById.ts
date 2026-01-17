"use server";

import { prisma } from "@/lib/prisma";
import { T_Resume } from "@/types/resumeInfos";
import { revalidatePath } from "next/cache";

export async function updateResumeById(id: string, data: T_Resume) {
  console.log(data);
  try {
    const resume = await prisma.resume.update({
      where: {
        id: id,
      },
      data: {
        content: data as any,
      },
    });

    revalidatePath("/app/resumes");
    revalidatePath("/app/resumes/create");
    if (resume) return resume;
    return null;
  } catch (error) {
    return null;
  }
}
