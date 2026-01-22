"use server";

import { redirect } from "next/navigation";
import { getUserId } from "../utils/getUserId";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const returnUrl = absoluteUrl("/app/dashboard");

export const createStripeUrl = async () => {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId,
    },
  });

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: returnUrl,
    cancel_url: returnUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "Resume IO Premium",
            description: "Unlimited resumes and AI credits",
          },
          unit_amount: 1900,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
  });

  return { url: stripeSession.url };
};
