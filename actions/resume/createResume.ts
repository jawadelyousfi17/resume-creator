"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";

export async function createResume() {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Not autorized" };
    const resume = await prisma.resume.create({
      data: {
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
