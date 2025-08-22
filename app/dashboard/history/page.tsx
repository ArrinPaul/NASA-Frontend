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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  History,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationResult {
  id: string
  location: string
  coordinates: string
  date: string
  status: "completed" | "processing" | "failed"
  accuracy: number
  rmse: number
  correlation: number
  ndvi: number
  sam: number
  dataPoints: number
  processingTime: string
  satellite: string
  landcoverType: string
}

const mockResults: ValidationResult[] = [
  {
    id: "VAL-2024-001",
    location: "Tokyo Bay, Japan",
    coordinates: "35.6762°N, 139.6503°E",
    date: "2024-01-15 14:23:45",
    status: "completed",
    accuracy: 99.8,
    rmse: 0.0087,
    correlation: 0.9847,
    ndvi: 0.234,
    sam: 0.0234,
    dataPoints: 8750,
    processingTime: "2m 34s",
    satellite: "Landsat 8",
    landcoverType: "Urban/Water",
  },
  {
    id: "VAL-2024-002",
    location: "Amazon Basin, Brazil",
    coordinates: "3.4653°S, 62.2159°W",
    date: "2024-01-14 16:45:12",
    status: "completed",
    accuracy: 97.5,
    rmse: 0.0156,
    correlation: 0.9723,
    ndvi: 0.789,
    sam: 0.0345,
    dataPoints: 12450,
    processingTime: "3m 12s",
    satellite: "Landsat 9",
    landcoverType: "Forest",
  },
  {
    id: "VAL-2024-003",
    location: "Sahara Desert, Algeria",
    coordinates: "23.8859°N, 5.5281°E",
    date: "2024-01-13 18:12:33",
    status: "processing",
    accuracy: 0,
    rmse: 0,
    correlation: 0,
    ndvi: 0.045,
    sam: 0,
    dataPoints: 5670,
    processingTime: "—",
    satellite: "Sentinel-2A",
    landcoverType: "Desert",
  },
  {
    id: "VAL-2024-004",
    location: "Great Lakes, USA",
    coordinates: "44.3106°N, 85.6024°W",
    date: "2024-01-12 20:34:21",
    status: "failed",
    accuracy: 0,
    rmse: 0,
    correlation: 0,
    ndvi: 0.156,
    sam: 0,
    dataPoints: 0,
    processingTime: "—",
    satellite: "Landsat 8",
    landcoverType: "Water",
  },
  {
    id: "VAL-2024-005",
    location: "Himalayan Range, Nepal",
    coordinates: "28.0000°N, 84.0000°E",
    date: "2024-01-11 12:15:45",
    status: "completed",
    accuracy: 94.2,
    rmse: 0.0234,
    correlation: 0.9456,
    ndvi: 0.345,
    sam: 0.0456,
    dataPoints: 6890,
    processingTime: "4m 56s",
    satellite: "Sentinel-2B",
    landcoverType: "Mountain/Snow",
  },
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedResult, setSelectedResult] = useState<ValidationResult | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredResults = mockResults.filter((result) => {
    const matchesSearch =
      result.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.satellite.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || result.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "processing":
        return <Clock className="w-4 h-4 text-warning" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-success/10 text-success border-success/20",
      processing: "bg-warning/10 text-warning border-warning/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
    }

    return (
      <Badge className={cn("capitalize", variants[status as keyof typeof variants])}>
        {getStatusIcon(status)}
        {status}
      </Badge>
    )
  }

  const handleRowClick = (result: ValidationResult) => {
    setSelectedResult(result)
    setIsDetailOpen(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading">Validation History</h1>
        <p className="text-muted-foreground">Review past validation results and export detailed reports</p>
      </div>

      {/* Controls */}
      <SpaceCard>
        <SpaceCardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, ID, or satellite..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <SpaceButton variant="outline">
                <Download className="w-4 h-4" />
                Export
              </SpaceButton>
            </div>
          </div>
        </SpaceCardContent>
      </SpaceCard>

      {/* Results Table */}
      <SpaceCard>
        <SpaceCardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              <SpaceCardTitle>Validation Results</SpaceCardTitle>
            </div>
            <SpaceCardDescription>{filteredResults.length} results found</SpaceCardDescription>
          </div>
        </SpaceCardHeader>
        <SpaceCardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Accuracy</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">RMSE</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Satellite</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr
                    key={result.id}
                    className="border-b border-border/50 hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(result)}
                  >
                    <td className="p-3">
                      <span className="font-mono text-primary">{result.id}</span>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{result.location}</div>
                        <div className="text-xs text-muted-foreground font-mono">{result.coordinates}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono">{result.date.split(" ")[0]}</span>
                    </td>
                    <td className="p-3">{getStatusBadge(result.status)}</td>
                    <td className="p-3">
                      <span className="font-mono">{result.status === "completed" ? `${result.accuracy}%` : "—"}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-mono">{result.status === "completed" ? result.rmse.toFixed(4) : "—"}</span>
                    </td>
                    <td className="p-3">{result.satellite}</td>
                    <td className="p-3">
                      <SpaceButton variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Eye className="w-4 h-4" />
                      </SpaceButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SpaceCardContent>
      </SpaceCard>

      {/* Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          {selectedResult && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {selectedResult.id}
                </SheetTitle>
                <SheetDescription>Detailed validation results and metrics</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Location Info */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Location Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{selectedResult.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coordinates</span>
                      <span className="font-mono">{selectedResult.coordinates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Land Cover</span>
                      <span>{selectedResult.landcoverType}</span>
                    </div>
                  </div>
                </div>

                {/* Processing Info */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Processing Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-mono">{selectedResult.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satellite</span>
                      <span>{selectedResult.satellite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Time</span>
                      <span className="font-mono">{selectedResult.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Points</span>
                      <span className="font-mono">{selectedResult.dataPoints.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                {selectedResult.status === "completed" && (
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Validation Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                        <div className="text-lg font-mono font-bold text-success">{selectedResult.accuracy}%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                        <div className="text-xs text-muted-foreground">RMSE</div>
                        <div className="text-lg font-mono font-bold">{selectedResult.rmse.toFixed(4)}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                        <div className="text-xs text-muted-foreground">Correlation</div>
                        <div className="text-lg font-mono font-bold">{selectedResult.correlation.toFixed(4)}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                        <div className="text-xs text-muted-foreground">SAM</div>
                        <div className="text-lg font-mono font-bold">{selectedResult.sam.toFixed(4)}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <h3 className="font-medium">Actions</h3>
                  <div className="flex flex-col gap-2">
                    <SpaceButton className="w-full" disabled={selectedResult.status !== "completed"}>
                      <Download className="w-4 h-4" />
                      Download Report
                    </SpaceButton>
                    <SpaceButton variant="outline" className="w-full" disabled={selectedResult.status !== "completed"}>
                      View in Compare
                    </SpaceButton>
                    <SpaceButton variant="ghost" className="w-full">
                      Reprocess Data
                    </SpaceButton>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
