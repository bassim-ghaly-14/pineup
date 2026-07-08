"use client";

import { createContext } from "react";

export const SocketContext =
  createContext(null);

export function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketContext.Provider value={null}>
      {children}
    </SocketContext.Provider>
  );
}