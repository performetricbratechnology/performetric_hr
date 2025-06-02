export function Separator({ ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className="h-0.5 text-slate-200 bg-slate-100 opacity-100 dark:opacity-30"
      {...props}
    />
  );
}
