"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";
import { checkSubscriptionLimits } from "../subscription/checkLimits";
import { act } from "react";

export async function createResume(active = true) {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Not autorized" };

    const limits = await checkSubscriptionLimits();
    if (!limits.canCreateResume) {
      return {
        error: `Resume limit reached. Free tier allows ${limits.resumeLimit} resumes. Upgrade to Premium for unlimited resumes.`,
      };
    }

    const resume = await prisma.resume.create({
      data: {
        active: active,
        userId: userId,
        content: {
          personalDetails: {
            jobTarget: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            linkedInProfile: "",
            cityState: "",
            postalCode: "",
            country: "",
          },
          employmentHistory: [],
          education: [],
          skills: [],
          professionalSummary: {
            description: "",
          },
          hobbies: "",
          languages: [],
          internships: [],
          courses: [],
          additional: [],
        },
      },
    });

    return { data: resume };
  } catch (error) {
    console.log("ERRO", error);
    return { error: "REsume did not create" };
  }
}
