import React from "react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "primary"
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
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors  focus:outline-none focus:bg-button-hover cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default: "bg-button text-button-foreground hover:bg-button-hover",
      destructive: "bg-destructive text-white hover:bg-destructive/90",
      primary:
        "border border-border hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus:outline-none",
      secondary:
        "border border-border hover:bg-destructive hover:text-red-50 focus:bg-destructive focus:text-red-50 focus:outline-none",
      outline: "border border-border",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
      link: "text-button underline-offset-4 hover:underline p-0! w-max h-auto!",
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
