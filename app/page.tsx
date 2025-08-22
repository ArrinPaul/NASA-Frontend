"use client"

import { useState, useEffect } from "react"
import { Globe } from "@/components/globe/globe"
import { WeatherPanel } from "@/components/weather/weather-panel"
import { SatellitePanel } from "@/components/satellite/satellite-panel"
import { Header } from "@/components/layout/header"
import { LocationPicker } from "@/components/location/location-picker"
import { DetailDrawer } from "@/components/detail/detail-drawer"
import { BackgroundVideo } from "@/components/background/background-video"
import { ThemeProvider } from "@/components/theme-provider"

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 35.6762,
    lng: 139.6503,
    name: "Tokyo, Japan"
  })
  const [selectedSatellite, setSelectedSatellite] = useState(null)
  const [selectedWeatherLocation, setSelectedWeatherLocation] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailType, setDetailType] = useState<'satellite' | 'weather' | null>(null)

  const handleSatelliteSelect = (satellite: any) => {
    setSelectedSatellite(satellite)
    setDetailType('satellite')
    setIsDetailOpen(true)
  }

  const handleWeatherSelect = (location: any) => {
    setSelectedWeatherLocation(location)
    setDetailType('weather')
    setIsDetailOpen(true)
  }

  const handleLocationChange = (location: any) => {
    setSelectedLocation(location)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundVideo />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
            {/* Globe Section */}
            <div className="lg:col-span-2 relative">
              <div className="h-full rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                <Globe
                  selectedLocation={selectedLocation}
                  onSatelliteSelect={handleSatelliteSelect}
                  onLocationSelect={handleLocationChange}
                />
              </div>
              
              {/* Location Picker Overlay */}
              <div className="absolute top-4 left-4 right-4 z-20">
                <LocationPicker
                  selectedLocation={selectedLocation}
                  onLocationChange={handleLocationChange}
                />
              </div>
            </div>

            {/* Weather Panel */}
            <div className="lg:col-span-1">
              <WeatherPanel
                location={selectedLocation}
                onExpand={() => handleWeatherSelect(selectedLocation)}
              />
            </div>

            {/* Satellite Panel */}
            <div className="lg:col-span-1">
              <SatellitePanel
                location={selectedLocation}
                onSatelliteSelect={handleSatelliteSelect}
              />
            </div>
          </div>
        </main>

        {/* Detail Drawer */}
        <DetailDrawer
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          type={detailType}
          data={detailType === 'satellite' ? selectedSatellite : selectedWeatherLocation}
        />
      </div>
    </div>
  )
}