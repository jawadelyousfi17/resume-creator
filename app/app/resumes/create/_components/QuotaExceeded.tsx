"use client";

import { Button } from "@/components/ui/button";
import { Crown, FileX, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function QuotaExceeded({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-muted flex  justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-background/95 backdrop-blur-md  rounded-md p-4 sm:p-8  ">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12  flex items-center justify-center border border-border/10">
              <FileX className="h-8 w-8 text-destructive" />
            </div>

            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
                Resume limit reached
              </h1>
              <p className="text-sm text-foreground/70 mt-1">{message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Free tier includes up to{" "}
                <span className="text-foreground">3</span> resumes.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            <div className="text-xs font-medium text-muted-foreground px-1">
              Upgrade to unlock
            </div>

            <div className="grid gap-2">
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

            <Button asChild size="lg" className=" bg-yellow-500 text-black">
              <Link href="/app/subscribe">
                <div className="flex items-center gap-3">
                  <Crown />
                  Upgrade to Premium
                </div>
              </Link>
            </Button>

            <Link href="/app/resumes">
              <Button size="lg" className="w-full bg-muted  text-foreground">
                Back to Resumes
              </Button>
            </Link>
          </div>

          <div className="mt-4 text-xs text-muted-foreground px-1">
            Need help?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
