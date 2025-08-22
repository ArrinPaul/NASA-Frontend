"use client"

import { cn } from "@/lib/utils"
import { MapPin, Upload, BarChart3, History, Home, Settings, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    description: "Mission control center",
  },
  {
    title: "Predict",
    href: "/dashboard/predict",
    icon: MapPin,
    description: "Satellite pass predictions",
  },
  {
    title: "Upload",
    href: "/dashboard/upload",
    icon: Upload,
    description: "Ground truth data import",
  },
  {
    title: "Compare",
    href: "/dashboard/compare",
    icon: BarChart3,
    description: "Validation analysis",
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
    description: "Results archive",
  },
]

const secondaryItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 border-r border-border/50 bg-muted/20 p-4">
      <div className="space-y-8">
        {/* Primary Navigation */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Navigation</h2>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      "hover:bg-accent/50 hover:text-accent-foreground",
                      isActive && "bg-primary/10 text-primary border border-primary/20 glow-primary",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">System</h2>
          <div className="space-y-1">
            {secondaryItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      "hover:bg-accent/50 hover:text-accent-foreground",
                      isActive && "bg-primary/10 text-primary border border-primary/20",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="px-3 py-4 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">System Online</span>
          </div>
          <p className="text-xs text-muted-foreground">All validation systems operational</p>
        </div>
      </div>
    </nav>
  )
}
