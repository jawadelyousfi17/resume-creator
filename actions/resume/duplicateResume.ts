"use server";

import { Resume } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function duplicateResume(toDuplicate: Resume, active = true) {
  try {
    const resume = await prisma.resume.create({
      data: {
        content: toDuplicate.content as any,
        name: `${toDuplicate.name} (copy)`,
        userId: toDuplicate.userId,
        active: active,
      },
    });

    revalidatePath("/");

    if (resume) return resume;
    return null;
  } catch (error) {
    return null;
  }
}
