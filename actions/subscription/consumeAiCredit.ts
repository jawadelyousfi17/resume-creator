"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "../utils/getUserId";

export type ConsumeCreditsResult = {
  success: boolean;
  error?: string;
  remainingCredits?: number;
};

export async function consumeAiCredit(): Promise<ConsumeCreditsResult> {
  const userId = await getUserId();
  if (!userId) return { success: false, error: "User not found" };

  try {
    const subscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      // Create subscription if doesn't exist
      const newSub = await prisma.userSubscription.create({
        data: {
          userId,
          tier: "FREE",
          aiCredits: 10,
        },
      });

      // Consume 1 credit immediately
      const updated = await prisma.userSubscription.update({
        where: { userId },
        data: { aiCredits: newSub.aiCredits - 1 },
      });

      return {
        success: true,
        remainingCredits: updated.aiCredits,
      };
    }

    if (subscription.tier === "PREMIUM") {
      // Premium has unlimited credits
      return { success: true, remainingCredits: -1 };
    }

    // TODO

    if (subscription.aiCredits <= 0) {
      return {
        success: false,
        error:
          "No AI credits remaining. Upgrade to Premium for unlimited access.",
      };
    }

    const updated = await prisma.userSubscription.update({
      where: { userId },
      data: { aiCredits: subscription.aiCredits - 1 },
    });

    return {
      success: true,
      remainingCredits: updated.aiCredits,
    };
  } catch (error) {
    console.error("Failed to consume AI credit:", error);
    return { success: false, error: "Failed to consume credit" };
  }
}
