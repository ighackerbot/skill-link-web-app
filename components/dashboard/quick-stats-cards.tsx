import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Award, TrendingUp } from "lucide-react"

export function QuickStatsCards() {
  const stats = [
    {
      label: "Active Matches",
      value: "12",
      change: "+3 this week",
      icon: Users,
      color: "text-foreground",
    },
    {
      label: "Sessions Completed",
      value: "24",
      change: "+5 this month",
      icon: Calendar,
      color: "text-accent",
    },
    {
      label: "SkillPoints",
      value: "1,250",
      change: "+150 earned",
      icon: Award,
      color: "text-accent-secondary",
    },
    {
      label: "Learning Streak",
      value: "7 days",
      change: "Keep it up!",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
