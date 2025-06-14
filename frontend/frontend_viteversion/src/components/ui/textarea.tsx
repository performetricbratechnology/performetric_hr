import * as React from "react";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-20 w-full p-2 text-foreground bg-input/30 border border-input 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-sm placeholder:text-foreground-secondary ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
