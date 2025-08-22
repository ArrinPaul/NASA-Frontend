"use client"

import { useEffect, useRef, useState } from "react"
import { Satellite, MapPin, Radio } from "lucide-react"
import { cn } from "@/lib/utils"

interface GlobeProps {
  selectedLocation: { lat: number; lng: number; name: string }
  onSatelliteSelect: (satellite: any) => void
  onLocationSelect: (location: any) => void
}

// Mock satellite data
const mockSatellites = [
  {
    id: "ISS",
    name: "International Space Station",
    lat: 25.7617,
    lng: -80.1918,
    altitude: 408,
    velocity: 27600,
    temperature: -157,
    signalStrength: 95,
    type: "Space Station",
    status: "Active"
  },
  {
    id: "LANDSAT8",
    name: "Landsat 8",
    lat: 40.7128,
    lng: -74.0060,
    altitude: 705,
    velocity: 27000,
    temperature: -180,
    signalStrength: 87,
    type: "Earth Observation",
    status: "Active"
  },
  {
    id: "NOAA19",
    name: "NOAA-19",
    lat: 51.5074,
    lng: -0.1278,
    altitude: 870,
    velocity: 26800,
    temperature: -165,
    signalStrength: 92,
    type: "Weather",
    status: "Active"
  }
]

// Mock ground stations
const groundStations = [
  { id: "GS1", name: "Tokyo Ground Station", lat: 35.6762, lng: 139.6503 },
  { id: "GS2", name: "New York Ground Station", lat: 40.7128, lng: -74.0060 },
  { id: "GS3", name: "London Ground Station", lat: 51.5074, lng: -0.1278 },
  { id: "GS4", name: "Sydney Ground Station", lat: -33.8688, lng: 151.2093 }
]

export function Globe({ selectedLocation, onSatelliteSelect, onLocationSelect }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredSatellite, setHoveredSatellite] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Simple world map rendering
    const drawGlobe = () => {
      const rect = canvas.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(centerX, centerY) * 0.8

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw globe background
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.lineWidth = 1
      
      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = centerY - (lat / 90) * radius * 0.8
        ctx.beginPath()
        ctx.moveTo(centerX - radius * 0.8, y)
        ctx.lineTo(centerX + radius * 0.8, y)
        ctx.stroke()
      }

      // Longitude lines
      for (let lng = -120; lng <= 120; lng += 60) {
        const x = centerX + (lng / 180) * radius * 0.8
        ctx.beginPath()
        ctx.moveTo(x, centerY - radius * 0.8)
        ctx.lineTo(x, centerY + radius * 0.8)
        ctx.stroke()
      }
    }

    const animate = () => {
      drawGlobe()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const convertToCanvasCoords = (lat: number, lng: number) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    const x = centerX + (lng / 180) * radius * 0.8
    const y = centerY - (lat / 90) * radius * 0.8

    return { x, y }
  }

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Satellites */}
      {mockSatellites.map((satellite) => {
        const { x, y } = convertToCanvasCoords(satellite.lat, satellite.lng)
        return (
          <div
            key={satellite.id}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200",
              hoveredSatellite === satellite.id && "scale-125 z-20"
            )}
            style={{ left: x, top: y }}
            onMouseEnter={() => setHoveredSatellite(satellite.id)}
            onMouseLeave={() => setHoveredSatellite(null)}
            onClick={() => onSatelliteSelect(satellite)}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
              <div className="absolute inset-0 w-3 h-3 border border-accent/50 rounded-full animate-ping" />
              
              {hoveredSatellite === satellite.id && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-2 min-w-32 text-xs">
                  <div className="font-medium">{satellite.name}</div>
                  <div className="text-muted-foreground">{satellite.type}</div>
                  <div className="text-accent">{satellite.altitude}km</div>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Ground Stations */}
      {groundStations.map((station) => {
        const { x, y } = convertToCanvasCoords(station.lat, station.lng)
        return (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            <div className="relative">
              <Radio className="w-4 h-4 text-primary" />
              <div className="absolute inset-0 w-4 h-4 border border-primary/30 rounded-full animate-pulse" />
            </div>
          </div>
        )
      })}

      {/* Selected Location */}
      {selectedLocation && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: convertToCanvasCoords(selectedLocation.lat, selectedLocation.lng).x,
            top: convertToCanvasCoords(selectedLocation.lat, selectedLocation.lng).y
          }}
        >
          <div className="relative">
            <MapPin className="w-5 h-5 text-destructive animate-bounce" />
            <div className="absolute inset-0 w-5 h-5 border border-destructive/50 rounded-full animate-ping" />
          </div>
        </div>
      )}

      {/* Orbit Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgb(167, 139, 250)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Example orbit paths */}
        <ellipse
          cx="50%"
          cy="50%"
          rx="40%"
          ry="25%"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="35%"
          ry="30%"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          strokeDasharray="3,3"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </svg>
    </div>
  )
}