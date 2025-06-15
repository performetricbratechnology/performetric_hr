interface DescriptionProps {
  children: React.ReactNode;
  aria: string;
}

export function Description({ children, aria }: DescriptionProps) {
  return (
    <p className="text-foreground-secondary" aria-label={aria}>
      {children}
    </p>
  );
}
