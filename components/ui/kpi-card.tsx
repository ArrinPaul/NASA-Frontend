import * as React from "react"
import { cn } from "@/lib/utils"
import { SpaceCard, SpaceCardContent, SpaceCardHeader, SpaceCardTitle } from "./space-card"

interface KPICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  description?: string
}

const KPICard = React.forwardRef<HTMLDivElement, KPICardProps>(
  ({ className, title, value, change, changeType = "neutral", icon, description, ...props }, ref) => {
    const changeColor = {
      positive: "text-success",
      negative: "text-destructive",
      neutral: "text-muted-foreground",
    }[changeType]

    return (
      <SpaceCard
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-accent/5 before:opacity-50",
          className,
        )}
        {...props}
      >
        <SpaceCardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <SpaceCardTitle className="text-sm font-medium text-muted-foreground">{title}</SpaceCardTitle>
            {icon && <div className="text-primary opacity-60">{icon}</div>}
          </div>
        </SpaceCardHeader>
        <SpaceCardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono tabular-nums">{value}</div>
            {change && <p className={cn("text-xs", changeColor)}>{change}</p>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </SpaceCardContent>
      </SpaceCard>
    )
  },
)
KPICard.displayName = "KPICard"

export { KPICard }
