"use client"

import { useState, useEffect } from "react"
import { SpaceCard, SpaceCardContent, SpaceCardHeader, SpaceCardTitle } from "@/components/ui/space-card"
import { SpaceButton } from "@/components/ui/space-button"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Eye, Expand } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeatherPanelProps {
  location: { lat: number; lng: number; name: string }
  onExpand: () => void
}

// Mock weather data
const mockWeatherData = {
  current: {
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    windDirection: "NE",
    precipitation: 0,
    visibility: 10,
    condition: "partly-cloudy",
    pressure: 1013
  },
  hourly: [
    { time: "12:00", temp: 22, condition: "sunny", precipitation: 0 },
    { time: "13:00", temp: 24, condition: "partly-cloudy", precipitation: 0 },
    { time: "14:00", temp: 26, condition: "cloudy", precipitation: 10 },
    { time: "15:00", temp: 25, condition: "rainy", precipitation: 60 },
    { time: "16:00", temp: 23, condition: "rainy", precipitation: 80 },
    { time: "17:00", temp: 21, condition: "partly-cloudy", precipitation: 20 }
  ]
}

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sunny":
      return <Sun className="w-5 h-5 text-yellow-500" />
    case "partly-cloudy":
      return <Cloud className="w-5 h-5 text-blue-400" />
    case "cloudy":
      return <Cloud className="w-5 h-5 text-gray-500" />
    case "rainy":
      return <CloudRain className="w-5 h-5 text-blue-600" />
    default:
      return <Sun className="w-5 h-5 text-yellow-500" />
  }
}

export function WeatherPanel({ location, onExpand }: WeatherPanelProps) {
  const [weatherData, setWeatherData] = useState(mockWeatherData)

  useEffect(() => {
    // Simulate weather data update based on location
    const updateWeather = () => {
      // In a real app, this would fetch from a weather API
      setWeatherData(mockWeatherData)
    }

    updateWeather()
  }, [location])

  return (
    <div className="h-full flex flex-col">
      <SpaceCard className="flex-1 bg-card/80 backdrop-blur-sm">
        <SpaceCardHeader>
          <div className="flex items-center justify-between">
            <SpaceCardTitle className="text-lg flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              Weather
            </SpaceCardTitle>
            <SpaceButton variant="ghost" size="sm" onClick={onExpand}>
              <Expand className="w-4 h-4" />
            </SpaceButton>
          </div>
          <p className="text-sm text-muted-foreground">{location.name}</p>
        </SpaceCardHeader>

        <SpaceCardContent className="space-y-4">
          {/* Current Weather */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              {getWeatherIcon(weatherData.current.condition)}
              <span className="text-3xl font-bold font-mono">
                {weatherData.current.temperature}°C
              </span>
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {weatherData.current.condition.replace('-', ' ')}
            </p>
          </div>

          {/* Weather Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Humidity</span>
              </div>
              <span className="font-mono font-bold">{weatherData.current.humidity}%</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <Wind className="w-4 h-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Wind</span>
              </div>
              <span className="font-mono font-bold">{weatherData.current.windSpeed} km/h</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <CloudRain className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-muted-foreground">Rain</span>
              </div>
              <span className="font-mono font-bold">{weatherData.current.precipitation}%</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">Visibility</span>
              </div>
              <span className="font-mono font-bold">{weatherData.current.visibility} km</span>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Hourly Forecast</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {weatherData.hourly.map((hour, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/10 border border-border/30"
                >
                  <span className="text-sm font-mono">{hour.time}</span>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(hour.condition)}
                    <span className="text-sm font-mono">{hour.temp}°</span>
                    <span className="text-xs text-blue-500">{hour.precipitation}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SpaceCardContent>
      </SpaceCard>
    </div>
  )
}