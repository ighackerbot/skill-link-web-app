import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MatchesSection } from "@/components/dashboard/matches-section"
import { QuickStatsCards } from "@/components/dashboard/quick-stats-cards"
import { UpcomingSessions } from "@/components/dashboard/upcoming-sessions"
import { LearningRoadmap } from "@/components/dashboard/learning-roadmap"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <QuickStatsCards />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MatchesSection />
            <UpcomingSessions />
          </div>
          <div>
            <LearningRoadmap />
          </div>
        </div>
      </main>
    </div>
  )
}
