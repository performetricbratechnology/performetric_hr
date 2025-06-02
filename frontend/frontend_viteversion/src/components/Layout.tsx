import type React from "react";
import { Sidebar } from "./sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      <Sidebar />
      {children}
    </div>
  );
}
