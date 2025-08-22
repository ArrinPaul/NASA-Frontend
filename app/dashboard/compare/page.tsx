"use client"

import { useState } from "react"
import {
  SpaceCard,
  SpaceCardContent,
  SpaceCardDescription,
  SpaceCardHeader,
  SpaceCardTitle,
} from "@/components/ui/space-card"
import { KPICard } from "@/components/ui/kpi-card"
import { SpaceButton } from "@/components/ui/space-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Target, TrendingUp, Zap, Eye, Settings } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts"

const spectralData = [
  { wavelength: 443, groundTruth: 0.045, satellite: 0.042, band: "Blue" },
  { wavelength: 482, groundTruth: 0.052, satellite: 0.049, band: "Blue" },
  { wavelength: 561, groundTruth: 0.078, satellite: 0.075, band: "Green" },
  { wavelength: 655, groundTruth: 0.089, satellite: 0.092, band: "Red" },
  { wavelength: 865, groundTruth: 0.234, satellite: 0.228, band: "NIR" },
  { wavelength: 1609, groundTruth: 0.156, satellite: 0.162, band: "SWIR1" },
  { wavelength: 2201, groundTruth: 0.089, satellite: 0.085, band: "SWIR2" },
]

const correlationData = [
  { x: 0.045, y: 0.042 },
  { x: 0.052, y: 0.049 },
  { x: 0.078, y: 0.075 },
  { x: 0.089, y: 0.092 },
  { x: 0.234, y: 0.228 },
  { x: 0.156, y: 0.162 },
  { x: 0.089, y: 0.085 },
]

const bandAccuracy = [
  { band: "Blue", accuracy: 94.2, samples: 1250 },
  { band: "Green", accuracy: 96.1, samples: 1250 },
  { band: "Red", accuracy: 97.8, samples: 1250 },
  { band: "NIR", accuracy: 95.5, samples: 1250 },
  { band: "SWIR1", accuracy: 93.7, samples: 1250 },
  { band: "SWIR2", accuracy: 92.4, samples: 1250 },
]

export default function ComparePage() {
  const [selectedDataset, setSelectedDataset] = useState("dataset-001")
  const [selectedBand, setSelectedBand] = useState("all")
  const [viewMode, setViewMode] = useState("spectral")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading">Validation Comparison</h1>
        <p className="text-muted-foreground">
          Compare ground truth data with satellite measurements and analyze validation metrics
        </p>
      </div>

      {/* Controls */}
      <SpaceCard>
        <SpaceCardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <SpaceCardTitle>Analysis Controls</SpaceCardTitle>
          </div>
        </SpaceCardHeader>
        <SpaceCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dataset</label>
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dataset-001">Tokyo Bay - 2024-01-15</SelectItem>
                  <SelectItem value="dataset-002">Amazon Basin - 2024-01-12</SelectItem>
                  <SelectItem value="dataset-003">Sahara Desert - 2024-01-10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Spectral Band</label>
              <Select value={selectedBand} onValueChange={setSelectedBand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bands</SelectItem>
                  <SelectItem value="blue">Blue (443-482nm)</SelectItem>
                  <SelectItem value="green">Green (561nm)</SelectItem>
                  <SelectItem value="red">Red (655nm)</SelectItem>
                  <SelectItem value="nir">NIR (865nm)</SelectItem>
                  <SelectItem value="swir1">SWIR1 (1609nm)</SelectItem>
                  <SelectItem value="swir2">SWIR2 (2201nm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">View Mode</label>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spectral">Spectral Comparison</SelectItem>
                  <SelectItem value="correlation">Correlation Analysis</SelectItem>
                  <SelectItem value="accuracy">Band Accuracy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SpaceCardContent>
      </SpaceCard>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="RMSE"
          value="0.0087"
          change="-12% improvement"
          changeType="positive"
          icon={<Target className="w-4 h-4" />}
          description="Root Mean Square Error"
        />
        <KPICard
          title="Correlation"
          value="0.9847"
          change="+2.1% increase"
          changeType="positive"
          icon={<TrendingUp className="w-4 h-4" />}
          description="Pearson correlation coefficient"
        />
        <KPICard
          title="NDVI Accuracy"
          value="96.3%"
          change="+1.8% improvement"
          changeType="positive"
          icon={<Eye className="w-4 h-4" />}
          description="Normalized Difference Vegetation Index"
        />
        <KPICard
          title="SAM Score"
          value="0.0234"
          change="-8% improvement"
          changeType="positive"
          icon={<Zap className="w-4 h-4" />}
          description="Spectral Angle Mapper"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Chart */}
        <SpaceCard className="lg:col-span-2">
          <SpaceCardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <SpaceCardTitle>
                  {viewMode === "spectral" && "Spectral Signature Comparison"}
                  {viewMode === "correlation" && "Ground Truth vs Satellite Correlation"}
                  {viewMode === "accuracy" && "Band-wise Accuracy Analysis"}
                </SpaceCardTitle>
              </div>
              <div className="flex gap-2">
                <SpaceButton
                  variant={viewMode === "spectral" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("spectral")}
                >
                  Spectral
                </SpaceButton>
                <SpaceButton
                  variant={viewMode === "correlation" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("correlation")}
                >
                  Correlation
                </SpaceButton>
                <SpaceButton
                  variant={viewMode === "accuracy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("accuracy")}
                >
                  Accuracy
                </SpaceButton>
              </div>
            </div>
          </SpaceCardHeader>
          <SpaceCardContent>
            <div className="h-80">
              {viewMode === "spectral" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spectralData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="wavelength"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value.toFixed(3)}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="groundTruth"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      name="Ground Truth"
                    />
                    <Line
                      type="monotone"
                      dataKey="satellite"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                      name="Satellite"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {viewMode === "correlation" && (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={["dataMin - 0.01", "dataMax + 0.01"]}
                      tickFormatter={(value) => `${value.toFixed(3)}`}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={["dataMin - 0.01", "dataMax + 0.01"]}
                      tickFormatter={(value) => `${value.toFixed(3)}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`${value.toFixed(4)}`, "Reflectance"]}
                      labelFormatter={() => "Data Point"}
                    />
                    <Scatter dataKey="y" fill="hsl(var(--primary))" />
                    {/* 1:1 reference line */}
                    <Line
                      type="linear"
                      dataKey="x"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              )}

              {viewMode === "accuracy" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bandAccuracy}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="band"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[90, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`${value}%`, "Accuracy"]}
                    />
                    <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </SpaceCardContent>
        </SpaceCard>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpaceCard>
          <SpaceCardHeader>
            <SpaceCardTitle>Statistical Summary</SpaceCardTitle>
            <SpaceCardDescription>Key validation statistics for the current dataset</SpaceCardDescription>
          </SpaceCardHeader>
          <SpaceCardContent>
            <div className="space-y-4">
              {[
                { metric: "Mean Absolute Error", value: "0.0065", unit: "reflectance" },
                { metric: "Standard Deviation", value: "0.0123", unit: "reflectance" },
                { metric: "R² Coefficient", value: "0.9694", unit: "" },
                { metric: "Bias", value: "-0.0012", unit: "reflectance" },
                { metric: "Sample Count", value: "8,750", unit: "points" },
              ].map((stat) => (
                <div key={stat.metric} className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">{stat.metric}</span>
                  <span className="font-mono font-medium">
                    {stat.value} {stat.unit}
                  </span>
                </div>
              ))}
            </div>
          </SpaceCardContent>
        </SpaceCard>

        <SpaceCard>
          <SpaceCardHeader>
            <SpaceCardTitle>Quality Assessment</SpaceCardTitle>
            <SpaceCardDescription>Validation quality indicators and recommendations</SpaceCardDescription>
          </SpaceCardHeader>
          <SpaceCardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 text-success mb-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="font-medium text-sm">Excellent Correlation</span>
                </div>
                <p className="text-xs text-success">R² &gt; 0.95 indicates strong linear relationship</p>
              </div>

              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 text-success mb-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="font-medium text-sm">Low RMSE</span>
                </div>
                <p className="text-xs text-success">RMSE &lt; 0.01 shows high measurement precision</p>
              </div>

              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2 text-warning mb-1">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="font-medium text-sm">SWIR Band Variance</span>
                </div>
                <p className="text-xs text-warning">Consider atmospheric correction for SWIR bands</p>
              </div>
            </div>
          </SpaceCardContent>
        </SpaceCard>
      </div>
    </div>
  )
}
