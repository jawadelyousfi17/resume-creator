"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";

export type CheckLimitsResult = {
  canCreateResume: boolean;
  canUseAi: boolean;
  resumeCount: number;
  resumeLimit: number;
  aiCredits: number;
  tier: string;
  error?: string;
};

export async function checkSubscriptionLimits(): Promise<CheckLimitsResult> {
  const userId = await getUserId();
  if (!userId) {
    return {
      canCreateResume: false,
      canUseAi: false,
      resumeCount: 0,
      resumeLimit: 0,
      aiCredits: 0,
      tier: "FREE",
      error: "User not found",
    };
  }

  try {
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

    const resumeCount = await prisma.resume.count({
      where: { userId, active: true },
    });

    const isPremium = subscription.tier === "PREMIUM";
    const resumeLimit = isPremium ? -1 : 3; // -1 means unlimited

    return {
      canCreateResume: isPremium || resumeCount < 3,
      canUseAi: isPremium || subscription.aiCredits > 0,
      resumeCount,
      resumeLimit,
      aiCredits: isPremium ? -1 : subscription.aiCredits,
      tier: subscription.tier,
    };
  } catch (error) {
    console.error("Failed to check subscription limits:", error);
    return {
      canCreateResume: false,
      canUseAi: false,
      resumeCount: 0,
      resumeLimit: 0,
      aiCredits: 0,
      tier: "FREE",
      error: "Failed to check limits",
    };
  }
}
