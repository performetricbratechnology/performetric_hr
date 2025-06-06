import * as React from "react";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-20 w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
