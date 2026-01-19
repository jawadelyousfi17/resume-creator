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
import { Crown, FileX } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";

export function ResumeQuotaExceededDialog({
  open,
  onOpenChange,
  limits,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  limits?: CheckLimitsResult | null;
}) {
  const subtitle = useMemo(() => {
    if (!limits) return "Free tier includes up to 3 resumes.";
    if (limits.tier === "PREMIUM") return "";
    const used = Math.max(0, limits.resumeCount);
    const total = limits.resumeLimit > 0 ? limits.resumeLimit : 3;
    return `You’ve used ${used}/${total} resumes on the Free tier.`;
  }, [limits]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileX className="h-5 w-5 text-destructive" />
            Resume limit reached
          </DialogTitle>
          <DialogDescription className="font-light">
            You’ve reached your Free tier resume limit. Upgrade to Premium to
            create unlimited resumes.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-border/40 bg-muted/30 p-4">
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
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

export function useResumeQuotaGate() {
  const [open, setOpen] = useState(false);
  const [limits, setLimits] = useState<CheckLimitsResult | null>(null);

  const ensureCanCreateResume = useCallback(async () => {
    const result = await checkSubscriptionLimits();
    setLimits(result);

    if (!result.canCreateResume) {
      setOpen(true);
      return false;
    }

    return true;
  }, []);

  const openDialog = useCallback(() => setOpen(true), []);

  return {
    ensureCanCreateResume,
    openDialog,
    dialog: (
      <ResumeQuotaExceededDialog
        open={open}
        onOpenChange={setOpen}
        limits={limits}
      />
    ),
  };
}
