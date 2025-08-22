"use client"

import { useState } from "react"
import {
  SpaceCard,
  SpaceCardContent,
  SpaceCardDescription,
  SpaceCardHeader,
  SpaceCardTitle,
} from "@/components/ui/space-card"
import { SpaceButton } from "@/components/ui/space-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Satellite, Clock, Eye, Compass } from "lucide-react"

interface SatellitePass {
  id: string
  satellite: string
  startTime: string
  duration: string
  maxElevation: number
  direction: string
  magnitude: number
}

export default function PredictPage() {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [predictions, setPredictions] = useState<SatellitePass[]>([])

  const handlePredict = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setPredictions([
        {
          id: "LANDSAT-8-001",
          satellite: "Landsat 8",
          startTime: "2024-01-15 14:23:45",
          duration: "11m 32s",
          maxElevation: 78,
          direction: "SW → NE",
          magnitude: -2.1,
        },
        {
          id: "LANDSAT-9-002",
          satellite: "Landsat 9",
          startTime: "2024-01-15 16:45:12",
          duration: "9m 18s",
          maxElevation: 65,
          direction: "NW → SE",
          magnitude: -1.8,
        },
        {
          id: "SENTINEL-2A-003",
          satellite: "Sentinel-2A",
          startTime: "2024-01-15 18:12:33",
          duration: "8m 45s",
          maxElevation: 52,
          direction: "S → N",
          magnitude: -1.5,
        },
        {
          id: "SENTINEL-2B-004",
          satellite: "Sentinel-2B",
          startTime: "2024-01-15 20:34:21",
          duration: "10m 12s",
          maxElevation: 71,
          direction: "SW → NE",
          magnitude: -1.9,
        },
      ])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading">Satellite Pass Predictions</h1>
        <p className="text-muted-foreground">Calculate precise satellite pass timings for any location on Earth</p>
      </div>

      {/* Input Form */}
      <SpaceCard>
        <SpaceCardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <SpaceCardTitle>Location Coordinates</SpaceCardTitle>
          </div>
          <SpaceCardDescription>Enter latitude and longitude to calculate satellite passes</SpaceCardDescription>
        </SpaceCardHeader>
        <SpaceCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                placeholder="35.6762"
                value={coordinates.latitude}
                onChange={(e) => setCoordinates({ ...coordinates, latitude: e.target.value })}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">Decimal degrees (-90 to 90)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                placeholder="139.6503"
                value={coordinates.longitude}
                onChange={(e) => setCoordinates({ ...coordinates, longitude: e.target.value })}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">Decimal degrees (-180 to 180)</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <SpaceButton
              onClick={handlePredict}
              disabled={isLoading || !coordinates.latitude || !coordinates.longitude}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Satellite className="w-4 h-4" />
                  Predict Passes
                </>
              )}
            </SpaceButton>
            <SpaceButton
              variant="outline"
              onClick={() => {
                setCoordinates({ latitude: "35.6762", longitude: "139.6503" })
              }}
            >
              Use Tokyo Example
            </SpaceButton>
          </div>
        </SpaceCardContent>
      </SpaceCard>

      {/* Map and Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Component */}
        <SpaceCard className="lg:sticky lg:top-24 lg:h-fit">
          <SpaceCardHeader>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-accent" />
              <SpaceCardTitle>Ground Track Visualization</SpaceCardTitle>
            </div>
            <SpaceCardDescription>Interactive map showing satellite ground tracks and coverage</SpaceCardDescription>
          </SpaceCardHeader>
          <SpaceCardContent>
            <div className="aspect-square bg-muted/20 rounded-lg border border-border/50 relative overflow-hidden">
              {/* Placeholder Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">
                      {coordinates.latitude && coordinates.longitude
                        ? `${coordinates.latitude}°, ${coordinates.longitude}°`
                        : "Enter coordinates to view location"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Orbital paths overlay */}
              <div className="absolute inset-0">
                <svg className="w-full h-full opacity-20">
                  <defs>
                    <linearGradient id="orbit1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(91, 199, 255)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="orbit2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgb(167, 139, 250)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 100 Q 150 50 300 120"
                    stroke="url(#orbit1)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 300 80 Q 150 150 0 100"
                    stroke="url(#orbit2)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            </div>
          </SpaceCardContent>
        </SpaceCard>

        {/* Predictions Table */}
        <div className="space-y-6">
          {predictions.length > 0 && (
            <SpaceCard>
              <SpaceCardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-success" />
                  <SpaceCardTitle>Upcoming Passes</SpaceCardTitle>
                </div>
                <SpaceCardDescription>
                  Next {predictions.length} satellite passes for the selected location
                </SpaceCardDescription>
              </SpaceCardHeader>
              <SpaceCardContent>
                <div className="space-y-4">
                  {predictions.map((pass) => (
                    <div
                      key={pass.id}
                      className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <div>
                            <h4 className="font-medium">{pass.satellite}</h4>
                            <p className="text-sm text-muted-foreground font-mono">{pass.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-mono">{pass.magnitude}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Start Time</p>
                          <p className="font-mono">{pass.startTime}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-mono">{pass.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Max Elevation</p>
                          <p className="font-mono">{pass.maxElevation}°</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Direction</p>
                          <p className="font-mono">{pass.direction}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <SpaceButton size="sm" variant="outline">
                          View Details
                        </SpaceButton>
                        <SpaceButton size="sm" variant="ghost">
                          Add to Calendar
                        </SpaceButton>
                      </div>
                    </div>
                  ))}
                </div>
              </SpaceCardContent>
            </SpaceCard>
          )}

          {predictions.length === 0 && !isLoading && (
            <SpaceCard>
              <SpaceCardContent className="text-center py-12">
                <Satellite className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Predictions Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter coordinates and click "Predict Passes" to see upcoming satellite passes
                </p>
              </SpaceCardContent>
            </SpaceCard>
          )}
        </div>
      </div>
    </div>
  )
}
