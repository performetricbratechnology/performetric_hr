import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Interface para os subcomponentes
interface CardSubComponents {
  Header: React.FC<CardProps>
  Title: React.FC<CardProps>
  Description: React.FC<CardProps>
  Content: React.FC<CardProps>
  Footer: React.FC<CardProps>
}

// Tipo do componente principal
type CardComponent = React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> &
  CardSubComponents

// Implementação do Card principal
const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 ${className}`}
      {...props}
    />
  )
)

CardRoot.displayName = 'Card'

// Implementação dos subcomponentes
const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

// Composição do componente completo
const Card: CardComponent = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

export { Card, CardHeader, CardContent, CardDescription, CardFooter, CardRoot, CardTitle }
export type { CardProps }
