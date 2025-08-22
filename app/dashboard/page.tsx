import {
  SpaceCard,
  SpaceCardContent,
  SpaceCardDescription,
  SpaceCardHeader,
  SpaceCardTitle,
} from "@/components/ui/space-card"
import { KPICard } from "@/components/ui/kpi-card"
import { SpaceButton } from "@/components/ui/space-button"
import { MapPin, Upload, Activity, Zap, Target, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading">Mission Control</h1>
        <p className="text-muted-foreground">Welcome to your satellite ground truth validation dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Validations"
          value="24"
          change="+12% from last week"
          changeType="positive"
          icon={<Activity className="w-4 h-4" />}
          description="Currently processing"
        />
        <KPICard
          title="Accuracy Rate"
          value="99.7%"
          change="+0.3% improvement"
          changeType="positive"
          icon={<Target className="w-4 h-4" />}
          description="Average validation accuracy"
        />
        <KPICard
          title="Processing Speed"
          value="15ms"
          change="-5ms faster"
          changeType="positive"
          icon={<Zap className="w-4 h-4" />}
          description="Average processing time"
        />
        <KPICard
          title="Uptime"
          value="99.9%"
          change="Last 30 days"
          changeType="neutral"
          icon={<Clock className="w-4 h-4" />}
          description="System availability"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpaceCard className="group hover:scale-[1.02] transition-transform duration-300">
          <SpaceCardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <SpaceCardTitle className="text-xl">Predict Satellite Passes</SpaceCardTitle>
                <SpaceCardDescription>
                  Calculate pass predictions for any location with precise timing
                </SpaceCardDescription>
              </div>
            </div>
          </SpaceCardHeader>
          <SpaceCardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter coordinates to get detailed satellite pass information including elevation, azimuth, and timing
                data.
              </p>
              <SpaceButton asChild className="w-full">
                <Link href="/dashboard/predict">
                  <MapPin className="w-4 h-4" />
                  Start Prediction
                </Link>
              </SpaceButton>
            </div>
          </SpaceCardContent>
        </SpaceCard>

        <SpaceCard className="group hover:scale-[1.02] transition-transform duration-300">
          <SpaceCardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Upload className="w-5 h-5 text-accent" />
              </div>
              <div>
                <SpaceCardTitle className="text-xl">Upload Ground Truth Data</SpaceCardTitle>
                <SpaceCardDescription>Import CSV files with validation and preview capabilities</SpaceCardDescription>
              </div>
            </div>
          </SpaceCardHeader>
          <SpaceCardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Drag and drop CSV files or browse to upload ground truth data for validation processing.
              </p>
              <SpaceButton asChild className="w-full" variant="outline">
                <Link href="/dashboard/upload">
                  <Upload className="w-4 h-4" />
                  Upload Data
                </Link>
              </SpaceButton>
            </div>
          </SpaceCardContent>
        </SpaceCard>
      </div>

      {/* Recent Activity */}
      <SpaceCard>
        <SpaceCardHeader>
          <div className="flex items-center justify-between">
            <div>
              <SpaceCardTitle>Recent Validation Activity</SpaceCardTitle>
              <SpaceCardDescription>Latest ground truth validation results and processing status</SpaceCardDescription>
            </div>
            <SpaceButton variant="ghost" asChild>
              <Link href="/dashboard/history">View All</Link>
            </SpaceButton>
          </div>
        </SpaceCardHeader>
        <SpaceCardContent>
          <div className="space-y-4">
            {[
              {
                id: "VAL-001",
                location: "35.6762°N, 139.6503°E",
                status: "Completed",
                accuracy: "99.8%",
                time: "2 hours ago",
              },
              {
                id: "VAL-002",
                location: "40.7128°N, 74.0060°W",
                status: "Processing",
                accuracy: "—",
                time: "4 hours ago",
              },
              {
                id: "VAL-003",
                location: "51.5074°N, 0.1278°W",
                status: "Completed",
                accuracy: "99.5%",
                time: "6 hours ago",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div>
                    <div className="font-medium font-mono text-sm">{item.id}</div>
                    <div className="text-sm text-muted-foreground">{item.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium">{item.status}</div>
                    <div className="text-muted-foreground">Status</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium font-mono">{item.accuracy}</div>
                    <div className="text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{item.time}</div>
                    <div className="text-muted-foreground">Time</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SpaceCardContent>
      </SpaceCard>
    </div>
  )
}
