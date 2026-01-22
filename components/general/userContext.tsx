"use client";

import { User, UserSubscription } from "@/lib/generated/prisma";
import React, { createContext, useContext, ReactNode } from "react";

type UserWithSubscription = User & {
  subscription: UserSubscription | null;
};

interface UserContextType {
  user: UserWithSubscription | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserWithSubscription | null;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
