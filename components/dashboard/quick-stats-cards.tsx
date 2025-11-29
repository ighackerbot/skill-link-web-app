"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Award, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { getUserStats } from "@/lib/db/stats"

export function QuickStatsCards() {
  const [stats, setStats] = useState({
    activeMatches: 0,
    sessionsCompleted: 0,
    skillPoints: 0,
    streak: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getUserStats()
        if (data) {
          setStats(data)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const statItems = [
    {
      label: "Active Matches",
      value: loading ? "-" : stats.activeMatches.toString(),
      change: "Total matches",
      icon: Users,
      color: "text-foreground",
    },
    {
      label: "Sessions Completed",
      value: loading ? "-" : stats.sessionsCompleted.toString(),
      change: "Lifetime sessions",
      icon: Calendar,
      color: "text-accent",
    },
    {
      label: "SkillPoints",
      value: loading ? "-" : stats.skillPoints.toLocaleString(),
      change: "Total earned",
      icon: Award,
      color: "text-accent-secondary",
    },
    {
      label: "Learning Streak",
      value: loading ? "-" : `${stats.streak} days`,
      change: "Current streak",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
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
