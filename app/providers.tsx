"use client";

import React from "react";
import { CollapseProvider } from "@/components/general/useCollapse";
import { ConfirmProvider } from "@/components/general/confirmContext";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/components/general/userContext";
import NextTopLoader from "nextjs-toploader";
import { User } from "@/lib/generated/prisma";

export default function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return (
    <UserProvider user={user}>
      <NextTopLoader
        color="#17b0d2"
        height={2}
        showSpinner={false}
        shadow={false}
      />
      <ConfirmProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <CollapseProvider>{children}</CollapseProvider>
      </ConfirmProvider>
    </UserProvider>
  );
}
