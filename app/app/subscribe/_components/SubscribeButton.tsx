"use client";

import { Button } from "@/components/ui/button";
import { createStripeUrl } from "@/actions/subscription/stripe";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const SubscribeButton = ({
  isYearly = false,
  priceId,
}: {
  isYearly?: boolean;
  priceId?: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const { url } = await createStripeUrl();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleSubscribe}
      className="w-full bg-yellow-500 text-black hover:bg-yellow-500/90"
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
      Upgrade {isYearly ? "Yearly" : "Monthly"}
    </Button>
  );
};
