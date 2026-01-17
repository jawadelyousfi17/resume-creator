"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";

export async function getAllResume() {
  const userId = await getUserId();

  if (!userId) return null;

  try {
    const resumes = await prisma.resume.findMany({
      where: {
        userId,
        active: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return resumes;
  } catch (error) {
    return null;
  }
}
