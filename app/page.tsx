import { SpaceButton } from "@/components/ui/space-button"
import { SpaceCard, SpaceCardDescription, SpaceCardHeader, SpaceCardTitle } from "@/components/ui/space-card"
import { Satellite, MapPin, Upload, BarChart3, History, Github } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                <Satellite className="w-4 h-4" />
                Satellite Ground Truth Validation
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Landsat Ground Truth
                </span>
                <br />
                <span className="text-foreground">Validator</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Validate satellite imagery with precision using our space-inspired platform. Compare ground truth data,
                analyze spectral signatures, and track validation history.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SpaceButton variant="space" size="xl" asChild>
                <Link href="/dashboard">
                  <Satellite className="w-5 h-5" />
                  Launch Platform
                </Link>
              </SpaceButton>
              <SpaceButton variant="orbit" size="xl" asChild>
                <Link href="/auth">
                  <Github className="w-5 h-5" />
                  Login with GitHub
                </Link>
              </SpaceButton>
            </div>
          </div>
        </div>

        {/* Orbital decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-dashed border-primary/10 rounded-full animate-spin-slow" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-accent/10 rounded-full animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "60s" }}
        />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Mission Control Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to validate satellite ground truth data with scientific precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpaceCard className="group hover:scale-105 transition-transform duration-300">
              <SpaceCardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <SpaceCardTitle className="text-lg">Predict Passes</SpaceCardTitle>
                <SpaceCardDescription>
                  Calculate satellite pass predictions for any location with precise timing
                </SpaceCardDescription>
              </SpaceCardHeader>
            </SpaceCard>

            <SpaceCard className="group hover:scale-105 transition-transform duration-300">
              <SpaceCardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Upload className="w-6 h-6 text-accent" />
                </div>
                <SpaceCardTitle className="text-lg">Upload Data</SpaceCardTitle>
                <SpaceCardDescription>
                  Import CSV ground truth data with validation and preview capabilities
                </SpaceCardDescription>
              </SpaceCardHeader>
            </SpaceCard>

            <SpaceCard className="group hover:scale-105 transition-transform duration-300">
              <SpaceCardHeader>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                  <BarChart3 className="w-6 h-6 text-success" />
                </div>
                <SpaceCardTitle className="text-lg">Compare Results</SpaceCardTitle>
                <SpaceCardDescription>
                  Analyze KPIs, spectral signatures, and validation metrics with interactive charts
                </SpaceCardDescription>
              </SpaceCardHeader>
            </SpaceCard>

            <SpaceCard className="group hover:scale-105 transition-transform duration-300">
              <SpaceCardHeader>
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
                  <History className="w-6 h-6 text-warning" />
                </div>
                <SpaceCardTitle className="text-lg">Track History</SpaceCardTitle>
                <SpaceCardDescription>
                  Review validation history with detailed results and exportable reports
                </SpaceCardDescription>
              </SpaceCardHeader>
            </SpaceCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold font-mono text-primary">99.7%</div>
              <div className="text-lg font-medium">Validation Accuracy</div>
              <div className="text-sm text-muted-foreground">Precision ground truth matching</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold font-mono text-accent">15ms</div>
              <div className="text-lg font-medium">Processing Speed</div>
              <div className="text-sm text-muted-foreground">Average validation time</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold font-mono text-success">24/7</div>
              <div className="text-lg font-medium">Mission Uptime</div>
              <div className="text-sm text-muted-foreground">Continuous monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready for Launch?</h2>
            <p className="text-lg text-muted-foreground">
              Join the mission to validate satellite ground truth data with unprecedented accuracy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SpaceButton variant="space" size="xl" asChild>
                <Link href="/dashboard">Begin Validation Mission</Link>
              </SpaceButton>
              <SpaceButton variant="outline" size="xl" asChild>
                <Link href="/docs">View Documentation</Link>
              </SpaceButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Satellite className="w-6 h-6 text-primary" />
              <span className="font-heading font-semibold text-lg">Landsat Ground Truth Validator</span>
            </div>
            <div className="text-sm text-muted-foreground">Built with precision for satellite validation missions</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
