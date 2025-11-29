import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <main className="container mx-auto px-4 py-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">User Management</h1>
                    <p className="text-muted-foreground">Manage students, faculty, and administrators</p>
                </div>
                <UserManagement />
            </main>
        </div>
    )
}
