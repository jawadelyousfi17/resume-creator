"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";

export async function getOrCreateSubscription() {
  const userId = await getUserId();
  if (!userId) return null;

  let subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    subscription = await prisma.userSubscription.create({
      data: {
        userId,
        tier: "FREE",
        aiCredits: 10,
      },
    });
  }

  return subscription;
}
