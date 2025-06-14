interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <h1 className="text-3xl font-bold text-foreground mb-2">{children}</h1>
  );
}
