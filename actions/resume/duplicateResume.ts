"use server";

import { Resume } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkSubscriptionLimits } from "../subscription/checkLimits";

export async function duplicateResume(toDuplicate: Resume, active = true) {
  try {
    // Check quota limits before duplicating
    const limits = await checkSubscriptionLimits();
    if (!limits.canCreateResume) {
      throw new Error(
        `Resume limit reached. Free tier allows ${limits.resumeLimit} resumes. Upgrade to Premium for unlimited resumes.`,
      );
    }

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
    console.error("Failed to duplicate resume:", error);
    return null;
  }
}
