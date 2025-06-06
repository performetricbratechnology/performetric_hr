import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border-transparent bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-50",
  secondary:
    "border-transparent bg-slate-700 dark:bg-slate-300 text-slate-50 dark:text-slate-950",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline:
    "border-slate-300 dark:border-slate-700 text-slate-950 dark:text-slate-50",
};

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-full border py-0.5 px-3 text-xs font-semibold transition-colors";
  const variantClass = variantClasses[variant];

  return (
    <div className={`${baseClasses} ${variantClass} ${className}`} {...props} />
  );
}

export { Badge };
