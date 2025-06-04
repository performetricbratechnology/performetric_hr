interface TabProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  children: React.ReactNode;
}

export function Tabs({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="tablist"
      aria-label="tablist"
      className=" w-full flex *:w-full items-center sm:justify-center rounded-lg bg-slate-200 dark:bg-slate-700 p-1 overflow-auto *:flex-1 *:inline-flex *:items-center *:justify-center *:whitespace-nowrap *:rounded-lg *:px-3 *:py-1.5 *:text-slate-700 *:dark:text-blue-100 *:text-sm *:font-medium *:cursor-pointer *:transition-colors  *:hover:bg-slate-300 *:dark:hover:bg-slate-600 *:data-[state=active]:bg-slate-300 *:dark:data-[state=active]:bg-slate-600 *:data-[state=active]:text-slate-950 *:dark:data-[state=active]:text-blue-50 *:data-[state=active]:shadow-sm"
    >
      {children}
    </div>
  );
}

export function Tab({ tab, setTab, label, children }: TabProps) {
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
