"use client"

import { SpaceButton } from "@/components/ui/space-button"
import { Satellite, Settings, User, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Satellite className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-semibold text-lg">Landsat Validator</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search validations, locations..."
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <SpaceButton variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </SpaceButton>
          <SpaceButton variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </SpaceButton>
          <SpaceButton variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </SpaceButton>
        </div>
      </div>
    </header>
  )
}
