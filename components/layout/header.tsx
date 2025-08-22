"use client"

import { useState } from "react"
import { Satellite, Moon, Sun, Settings, Search } from "lucide-react"
import { SpaceButton } from "@/components/ui/space-button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Animation */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-pulse">
                <Satellite className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              {/* Orbit rings */}
              <div className="absolute inset-0 w-10 h-10 border border-primary/30 rounded-full animate-ping" />
              <div className="absolute inset-0 w-10 h-10 border border-accent/20 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SatTracker Pro
              </h1>
              <p className="text-xs text-muted-foreground">Global Monitoring System</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className={cn(
              "relative transition-all duration-200",
              isSearchFocused && "scale-105"
            )}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search satellites, locations..."
                className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50 focus:bg-background/80"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <SpaceButton
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-accent/20"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </SpaceButton>
            
            <SpaceButton variant="ghost" size="icon" className="hover:bg-accent/20">
              <Settings className="w-4 h-4" />
            </SpaceButton>
          </div>
        </div>
      </div>
    </header>
  )
}