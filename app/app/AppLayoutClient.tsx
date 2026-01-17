"use client";
import React from "react";
import Aside from "@/components/general/aside";
import MainNavbar from "@/components/general/mainNavbar";
import LayoutShell from "../layoutShell";
import { usePathname } from "next/navigation";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname.split("/")[2] || "resumes";

  return (
    <>
      <div className="hidden md:block">
        <Aside active={active} />
      </div>
      <MainNavbar />
      <LayoutShell>{children}</LayoutShell>
    </>
  );
}
