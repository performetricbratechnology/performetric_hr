import type React from "react";
import { Sidebar } from "./sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 ml-14 sm:ml-18 overflow-hidden">{children}</main>
    </div>
  );
}
