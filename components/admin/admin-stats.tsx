"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, MessageSquare, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { getAdminStats } from "@/lib/db/admin"

export function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    messagesSent: 0,
    matchSuccessRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAdminStats()
        setStats(data)
      } catch (error) {
        console.error('Error loading admin stats:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const statItems = [
    {
      label: "Total Users",
      value: loading ? "-" : stats.totalUsers.toLocaleString(),
      change: "Total registered",
      trend: "up",
      icon: Users,
      color: "text-foreground",
    },
    {
      label: "Active Sessions",
      value: loading ? "-" : stats.activeSessions.toLocaleString(),
      change: "Currently active",
      trend: "up",
      icon: BookOpen,
      color: "text-accent",
    },
    {
      label: "Messages Sent",
      value: loading ? "-" : stats.messagesSent.toLocaleString(),
      change: "Total messages",
      trend: "up",
      icon: MessageSquare,
      color: "text-accent-secondary",
    },
    {
      label: "Match Success Rate",
      value: loading ? "-" : `${stats.matchSuccessRate}%`,
      change: "Estimated",
      trend: "up",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <Card key={stat.label} className="bg-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-xs ${stat.trend === "up" ? "text-accent" : "text-error"}`}>{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
