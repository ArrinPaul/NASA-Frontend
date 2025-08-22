import * as React from "react"
import { cn } from "@/lib/utils"

const SpaceCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "hover:shadow-lg hover:shadow-primary/10 transition-all duration-200",
        "relative overflow-hidden",
        className,
      )}
      {...props}
    />
  ),
)
SpaceCard.displayName = "SpaceCard"

const SpaceCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        "relative",
        "before:absolute before:inset-x-0 before:bottom-0 before:h-px",
        "before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent",
        className,
      )}
      {...props}
    />
  ),
)
SpaceCardHeader.displayName = "SpaceCardHeader"

const SpaceCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", "font-heading text-foreground", className)}
      {...props}
    />
  ),
)
SpaceCardTitle.displayName = "SpaceCardTitle"

const SpaceCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
SpaceCardDescription.displayName = "SpaceCardDescription"

const SpaceCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
SpaceCardContent.displayName = "SpaceCardContent"

const SpaceCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
SpaceCardFooter.displayName = "SpaceCardFooter"

export { SpaceCard, SpaceCardHeader, SpaceCardFooter, SpaceCardTitle, SpaceCardDescription, SpaceCardContent }
