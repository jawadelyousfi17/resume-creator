"use client";

import {
  checkSubscriptionLimits,
  type CheckLimitsResult,
} from "@/actions/subscription/checkLimits";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown, Sparkles, Zap } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { RiSparklingFill } from "react-icons/ri";
import Link from "next/link";

function toErrorMessage(error: unknown): string {
  if (!error) return "";
  if (error instanceof Error) return error.message;
  return String(error);
}

export function isAiCreditsExhaustedError(error: unknown): boolean {
  const message = toErrorMessage(error).toLowerCase();
  return (
    message.includes("no ai credits") ||
    message.includes("upgrade to premium") ||
    message.includes("ai credits remaining")
  );
}

export function AiCreditsExhaustedDialog({
  open,
  onOpenChange,
  limits,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  limits?: CheckLimitsResult | null;
}) {
  const creditsText = useMemo(() => {
    if (!limits) return "";
    if (limits.tier === "PREMIUM") return "";
    return `You have ${Math.max(0, limits.aiCredits)} AI credits left.`;
  }, [limits]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RiSparklingFill className="h-5 w-5 text-destructive" />
            AI credits used up
          </DialogTitle>
          <DialogDescription className="font-light">
            This feature uses AI credits. Upgrade to Premium for unlimited AI.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 bg-muted rounded-md">
          <div className=" rounded-xl  border-border/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-background border border-border/10 flex items-center justify-center">
                <Crown className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  Premium
                </span>
                <span className="text-xs text-muted-foreground">
                  Unlimited resumes and unlimited AI credits
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 ">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto bg-muted text-foreground"
          >
            Not now
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-500/90"
          >
            <Link href="/app/subscribe">
              <Crown className="h-4 w-4" />
              Upgrade to Premium
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useAiCreditsGate() {
  const [open, setOpen] = useState(false);
  const [limits, setLimits] = useState<CheckLimitsResult | null>(null);

  const ensureCanUseAi = useCallback(async () => {
    const result = await checkSubscriptionLimits();
    setLimits(result);

    if (!result.canUseAi) {
      setOpen(true);
      return false;
    }

    return true;
  }, []);

  const openDialog = useCallback(() => setOpen(true), []);

  return {
    ensureCanUseAi,
    openDialog,
    dialog: (
      <AiCreditsExhaustedDialog
        open={open}
        onOpenChange={setOpen}
        limits={limits}
      />
    ),
  };
}
