import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { PageKey, TabValue } from '@/types/tabs';

interface TabProps<P extends PageKey> {
  page: P;
  tab: TabValue<P>;
  setTab: React.Dispatch<React.SetStateAction<TabValue<P>>>;
  label: TabValue<P>;
  children: React.ReactNode;
}

export function Tabs({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="tablist"
      aria-label="tablist"
      className="w-full flex *:w-full items-center sm:justify-center rounded-lg bg-slate-200 dark:bg-slate-700 p-1 overflow-auto *:flex-1 *:inline-flex *:items-center *:justify-center *:whitespace-nowrap *:rounded-lg *:px-3 *:py-1.5 *:text-slate-700 *:dark:text-blue-100 *:text-sm *:font-medium *:cursor-pointer *:transition-colors  *:hover:bg-slate-300 *:dark:hover:bg-slate-600 *:data-[state=active]:bg-slate-300 *:dark:data-[state=active]:bg-slate-600 *:data-[state=active]:text-slate-950 *:dark:data-[state=active]:text-blue-50 *:data-[state=active]:shadow-sm"
    >
      {children}
    </div>
  );
}

export function Tab<P extends PageKey>({
  tab,
  setTab,
  label,
  children,
}: TabProps<P>) {
  return (
    <button
      role="tab"
      aria-selected={tab === label ? "true" : "false"}
      data-state={tab === label ? "active" : "inactive"}
      onClick={() => setTab(label)}
    >
      {children}
    </button>
  );
}

const TabsRoot = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm w-1/4 px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
};