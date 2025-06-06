import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Interface para os subcomponentes
interface CardSubComponents {
  Header: React.FC<CardProps>;
  Title: React.FC<CardProps>;
  Description: React.FC<CardProps>;
  Content: React.FC<CardProps>;
  Footer: React.FC<CardProps>;
}

// Tipo do componente principal
type CardComponent = React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> &
  CardSubComponents;

// Implementação do Card principal
const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-50 ${className}`}
      {...props}
    />
  )
);

CardRoot.displayName = "Card";

// Implementação dos subcomponentes
const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 py-6 px-4 sm:px-6 ${className}`}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm text-slate-500 dark:text-slate-400 ${className}`}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`py-6 pt-0 px-4 sm:px-6 ${className}`}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center py-6 pt-0 px-4 sm:px-6 ${className}`}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Composição do componente completo
const Card: CardComponent = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardRoot,
  CardTitle,
};
export type { CardProps };
