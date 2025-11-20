import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SessionsCalendar } from "@/components/sessions/sessions-calendar"
import { SessionsList } from "@/components/sessions/sessions-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Sessions</h1>
            <p className="text-muted-foreground">Manage your learning sessions and schedule new ones</p>
          </div>
          <Button className="bg-brand hover:bg-brand-hover">
            <Plus className="w-4 h-4 mr-2" />
            Book New Session
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SessionsCalendar />
          </div>
          <div>
            <SessionsList />
          </div>
        </div>
      </main>
    </div>
  )
}
