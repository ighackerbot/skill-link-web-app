import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { PlatformAnalytics } from "@/components/admin/platform-analytics"
import { UserManagement } from "@/components/admin/user-management"
import { ContentModeration } from "@/components/admin/content-moderation"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform health and manage users</p>
        </div>
        <AdminStats />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PlatformAnalytics />
            <ContentModeration />
          </div>
          <div>
            <UserManagement />
          </div>
        </div>
      </main>
    </div>
  )
}
