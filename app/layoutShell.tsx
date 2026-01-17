"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCollapse } from "@/components/general/useCollapse";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useCollapse();

  return (
    <div className={cn("min-h-dvh", collapsed ? "md:pl-22" : "md:pl-[272px]")}>
      {children}
    </div>
  );
}
