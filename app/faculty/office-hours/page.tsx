import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ManageSlots } from "@/components/faculty/manage-slots"

export default function FacultyOfficeHoursPage() {
    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <main className="container mx-auto px-4 py-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Manage Office Hours</h1>
                    <p className="text-muted-foreground">Create and manage your availability slots</p>
                </div>
                <ManageSlots />
            </main>
        </div>
    )
}
