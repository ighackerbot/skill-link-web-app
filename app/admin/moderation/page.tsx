import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ContentModeration } from "@/components/admin/content-moderation"

export default function AdminModerationPage() {
    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <main className="container mx-auto px-4 py-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Content Moderation</h1>
                    <p className="text-muted-foreground">Review reported posts and comments</p>
                </div>
                <ContentModeration />
            </main>
        </div>
    )
}
