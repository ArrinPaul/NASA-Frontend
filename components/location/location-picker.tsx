"use client"

import { useState } from "react"
import { SpaceButton } from "@/components/ui/space-button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationPickerProps {
  selectedLocation: { lat: number; lng: number; name: string }
  onLocationChange: (location: { lat: number; lng: number; name: string }) => void
}

const popularLocations = [
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
  { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278 },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
  { name: "São Paulo, Brazil", lat: -23.5505, lng: -46.6333 },
  { name: "Mumbai, India", lat: 19.0760, lng: 72.8777 }
]

export function LocationPicker({ selectedLocation, onLocationChange }: LocationPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLocationSelect = (location: any) => {
    onLocationChange(location)
    setIsExpanded(false)
    setSearchTerm("")
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onLocationChange({
            lat: latitude,
            lng: longitude,
            name: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 cursor-pointer transition-all duration-200 hover:border-primary/50",
            isExpanded && "border-primary/50"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium min-w-0 truncate">
            {selectedLocation.name}
          </span>
        </div>

        <SpaceButton
          variant="ghost"
          size="sm"
          onClick={getCurrentLocation}
          className="bg-card/90 backdrop-blur-sm border border-border/50"
        >
          <Navigation className="w-4 h-4" />
        </SpaceButton>
      </div>

      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-lg bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg z-30">
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Popular Locations */}
            <div className="space-y-1 max-h-48 overflow-y-auto">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Popular Locations
              </h4>
              {filteredLocations.map((location) => (
                <div
                  key={location.name}
                  className="flex items-center justify-between p-2 rounded hover:bg-accent/20 cursor-pointer transition-colors"
                  onClick={() => handleLocationSelect(location)}
                >
                  <span className="text-sm">{location.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Manual Coordinates */}
            <div className="pt-2 border-t border-border/50">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Manual Entry
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Latitude"
                  type="number"
                  step="0.0001"
                  className="text-sm"
                />
                <Input
                  placeholder="Longitude"
                  type="number"
                  step="0.0001"
                  className="text-sm"
                />
              </div>
              <SpaceButton size="sm" className="w-full mt-2">
                Set Location
              </SpaceButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}