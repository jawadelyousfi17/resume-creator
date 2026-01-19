"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function ResumeStartOptionCard({
  title,
  description,
  icon,
  onClick,
  className,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left w-full border border-border/50 rounded-xl p-4 hover:border-primary/60 hover:bg-primary/5 transition-colors",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-sm font-semibold text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
    </button>
  );
}
