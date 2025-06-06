import React from "react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus:outline-blue-400 dark:focus:outline-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-600/90",
      outline: "border border-slate-300 dark:border-slate-700",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (asChild) {
      const child = React.Children.only(children);
      if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
        return React.cloneElement(child, {
          className: `${child.props.className || ""} ${classes}`.trim(),
          ...props,
        });
      }
      return child;
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonVariant, ButtonSize, ButtonProps };
