"use client"

import { useState, useEffect } from "react"
import { SpaceCard, SpaceCardContent, SpaceCardHeader, SpaceCardTitle } from "@/components/ui/space-card"
import { SpaceButton } from "@/components/ui/space-button"
import { Satellite, Radio, Zap, Thermometer, Activity, Signal } from "lucide-react"
import { cn } from "@/lib/utils"

interface SatellitePanelProps {
  location: { lat: number; lng: number; name: string }
  onSatelliteSelect: (satellite: any) => void
}

// Mock satellite data
const mockSatellites = [
  {
    id: "ISS",
    name: "International Space Station",
    type: "Space Station",
    altitude: 408,
    velocity: 27600,
    temperature: -157,
    signalStrength: 95,
    status: "Active",
    nextPass: "14:23",
    duration: "6m 32s"
  },
  {
    id: "LANDSAT8",
    name: "Landsat 8",
    type: "Earth Observation",
    altitude: 705,
    velocity: 27000,
    temperature: -180,
    signalStrength: 87,
    status: "Active",
    nextPass: "16:45",
    duration: "4m 18s"
  },
  {
    id: "NOAA19",
    name: "NOAA-19",
    type: "Weather",
    altitude: 870,
    velocity: 26800,
    temperature: -165,
    signalStrength: 92,
    status: "Active",
    nextPass: "18:12",
    duration: "5m 45s"
  },
  {
    id: "GOES16",
    name: "GOES-16",
    type: "Geostationary",
    altitude: 35786,
    velocity: 11070,
    temperature: -190,
    signalStrength: 78,
    status: "Active",
    nextPass: "Always visible",
    duration: "Continuous"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-500"
    case "Inactive":
      return "text-red-500"
    case "Maintenance":
      return "text-yellow-500"
    default:
      return "text-gray-500"
  }
}

const getSignalStrengthColor = (strength: number) => {
  if (strength >= 90) return "text-green-500"
  if (strength >= 70) return "text-yellow-500"
  return "text-red-500"
}

export function SatellitePanel({ location, onSatelliteSelect }: SatellitePanelProps) {
  const [satellites, setSatellites] = useState(mockSatellites)
  const [selectedSatelliteId, setSelectedSatelliteId] = useState<string | null>(null)

  useEffect(() => {
    // Simulate satellite data update based on location
    const updateSatellites = () => {
      // In a real app, this would fetch from a satellite tracking API
      setSatellites(mockSatellites)
    }

    updateSatellites()
    
    // Update satellite positions every 5 seconds
    const interval = setInterval(updateSatellites, 5000)
    return () => clearInterval(interval)
  }, [location])

  const handleSatelliteClick = (satellite: any) => {
    setSelectedSatelliteId(satellite.id)
    onSatelliteSelect(satellite)
  }

  return (
    <div className="h-full flex flex-col">
      <SpaceCard className="flex-1 bg-card/80 backdrop-blur-sm">
        <SpaceCardHeader>
          <SpaceCardTitle className="text-lg flex items-center gap-2">
            <Satellite className="w-5 h-5 text-accent animate-spin-slow" />
            Satellites
          </SpaceCardTitle>
          <p className="text-sm text-muted-foreground">
            {satellites.filter(s => s.status === "Active").length} active satellites
          </p>
        </SpaceCardHeader>

        <SpaceCardContent>
          <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {satellites.map((satellite) => (
              <div
                key={satellite.id}
                className={cn(
                  "p-3 rounded-lg border border-border/50 cursor-pointer transition-all duration-200 hover:border-accent/50 hover:bg-accent/5",
                  selectedSatelliteId === satellite.id && "border-accent bg-accent/10"
                )}
                onClick={() => handleSatelliteClick(satellite)}
              >
                <div className="space-y-2">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{satellite.name}</h4>
                      <p className="text-xs text-muted-foreground">{satellite.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className={cn("w-3 h-3", getStatusColor(satellite.status))} />
                      <span className={cn("text-xs", getStatusColor(satellite.status))}>
                        {satellite.status}
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Radio className="w-3 h-3 text-blue-500" />
                      <span className="text-muted-foreground">Alt:</span>
                      <span className="font-mono">{satellite.altitude}km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <span className="text-muted-foreground">Vel:</span>
                      <span className="font-mono">{satellite.velocity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-purple-500" />
                      <span className="text-muted-foreground">Temp:</span>
                      <span className="font-mono">{satellite.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Signal className={cn("w-3 h-3", getSignalStrengthColor(satellite.signalStrength))} />
                      <span className="text-muted-foreground">Signal:</span>
                      <span className={cn("font-mono", getSignalStrengthColor(satellite.signalStrength))}>
                        {satellite.signalStrength}%
                      </span>
                    </div>
                  </div>

                  {/* Next Pass */}
                  <div className="pt-2 border-t border-border/30">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Next Pass:</span>
                      <span className="font-mono text-accent">{satellite.nextPass}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-mono">{satellite.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 rounded bg-muted/20">
                <div className="font-mono font-bold text-green-500">
                  {satellites.filter(s => s.status === "Active").length}
                </div>
                <div className="text-muted-foreground">Active</div>
              </div>
              <div className="text-center p-2 rounded bg-muted/20">
                <div className="font-mono font-bold text-accent">
                  {satellites.filter(s => s.signalStrength >= 80).length}
                </div>
                <div className="text-muted-foreground">Strong Signal</div>
              </div>
            </div>
          </div>
        </SpaceCardContent>
      </SpaceCard>
    </div>
  )
}