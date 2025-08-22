"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { SpaceButton } from "@/components/ui/space-button"
import { Satellite, Cloud, Activity, Radio, Thermometer, Zap, Signal, MapPin, Clock, Eye } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface DetailDrawerProps {
  isOpen: boolean
  onClose: () => void
  type: 'satellite' | 'weather' | null
  data: any
}

// Mock orbit data for satellite
const orbitData = [
  { time: "12:00", altitude: 408, velocity: 27600, temperature: -157 },
  { time: "12:15", altitude: 410, velocity: 27580, temperature: -155 },
  { time: "12:30", altitude: 407, velocity: 27620, temperature: -159 },
  { time: "12:45", altitude: 409, velocity: 27590, temperature: -156 },
  { time: "13:00", altitude: 408, velocity: 27600, temperature: -157 },
  { time: "13:15", altitude: 406, velocity: 27630, temperature: -160 }
]

// Mock weather forecast data
const forecastData = [
  { time: "12:00", temp: 22, humidity: 65, wind: 12, precipitation: 0 },
  { time: "15:00", temp: 26, humidity: 70, wind: 15, precipitation: 10 },
  { time: "18:00", temp: 24, humidity: 75, wind: 18, precipitation: 60 },
  { time: "21:00", temp: 20, humidity: 80, wind: 14, precipitation: 80 },
  { time: "00:00", temp: 18, humidity: 85, wind: 10, precipitation: 40 },
  { time: "03:00", temp: 16, humidity: 90, wind: 8, precipitation: 20 }
]

export function DetailDrawer({ isOpen, onClose, type, data }: DetailDrawerProps) {
  if (!data || !type) return null

  const renderSatelliteDetails = () => (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Satellite className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{data.name}</h3>
            <p className="text-muted-foreground">{data.type}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-green-500 font-medium">{data.status}</span>
        </div>
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Altitude</span>
          </div>
          <span className="text-2xl font-bold font-mono">{data.altitude}</span>
          <span className="text-sm text-muted-foreground ml-1">km</span>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Velocity</span>
          </div>
          <span className="text-2xl font-bold font-mono">{data.velocity.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground ml-1">km/h</span>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">Temperature</span>
          </div>
          <span className="text-2xl font-bold font-mono">{data.temperature}</span>
          <span className="text-sm text-muted-foreground ml-1">°C</span>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Signal className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Signal</span>
          </div>
          <span className="text-2xl font-bold font-mono">{data.signalStrength}</span>
          <span className="text-sm text-muted-foreground ml-1">%</span>
        </div>
      </div>

      {/* Orbit Path Chart */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">Orbit Telemetry</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orbitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="altitude" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Altitude (km)"
              />
              <Line 
                type="monotone" 
                dataKey="velocity" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Velocity (km/h)"
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Next Passes */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">Upcoming Passes</h4>
        <div className="space-y-2">
          {[
            { time: "14:23:45", duration: "6m 32s", elevation: "78°", direction: "SW → NE" },
            { time: "16:45:12", duration: "4m 18s", elevation: "65°", direction: "NW → SE" },
            { time: "18:12:33", duration: "5m 45s", elevation: "52°", direction: "S → N" }
          ].map((pass, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/10 border border-border/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-mono ml-2">{pass.time}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-mono ml-2">{pass.duration}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Elevation:</span>
                  <span className="font-mono ml-2">{pass.elevation}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Direction:</span>
                  <span className="font-mono ml-2">{pass.direction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderWeatherDetails = () => (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Cloud className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Weather Details</h3>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.name}
            </p>
          </div>
        </div>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="text-sm text-muted-foreground">Temperature</span>
          </div>
          <span className="text-2xl font-bold font-mono">22</span>
          <span className="text-sm text-muted-foreground ml-1">°C</span>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Humidity</span>
          </div>
          <span className="text-2xl font-bold font-mono">65</span>
          <span className="text-sm text-muted-foreground ml-1">%</span>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Wind Speed</span>
          </div>
          <span className="text-2xl font-bold font-mono">12</span>
          <span className="text-sm text-muted-foreground ml-1">km/h</span>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">Pressure</span>
          </div>
          <span className="text-2xl font-bold font-mono">1013</span>
          <span className="text-sm text-muted-foreground ml-1">hPa</span>
        </div>
      </div>

      {/* Weather Forecast Chart */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">24-Hour Forecast</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                name="Temperature (°C)"
              />
              <Line 
                type="monotone" 
                dataKey="precipitation" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Precipitation (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">Weather Alerts</h4>
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-yellow-500">Rain Expected</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Moderate rainfall expected between 14:00 - 17:00 today
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {type === 'satellite' ? (
              <Satellite className="w-5 h-5 text-accent" />
            ) : (
              <Cloud className="w-5 h-5 text-blue-500" />
            )}
            {type === 'satellite' ? 'Satellite Details' : 'Weather Details'}
          </SheetTitle>
          <SheetDescription>
            {type === 'satellite' 
              ? 'Comprehensive satellite tracking information and telemetry data'
              : 'Detailed weather conditions and forecast information'
            }
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {type === 'satellite' ? renderSatelliteDetails() : renderWeatherDetails()}
        </div>

        <div className="mt-8 flex gap-2">
          <SpaceButton className="flex-1">
            {type === 'satellite' ? 'Track Satellite' : 'Set Weather Alert'}
          </SpaceButton>
          <SpaceButton variant="outline" onClick={onClose}>
            Close
          </SpaceButton>
        </div>
      </SheetContent>
    </Sheet>
  )
}