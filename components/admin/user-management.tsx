"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical } from "lucide-react"
import { useEffect, useState } from "react"
import { getRecentUsers } from "@/lib/db/admin"
import { formatDistanceToNow } from "date-fns"

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getRecentUsers()
        setUsers(data)
      } catch (error) {
        console.error('Error loading users:', error)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Recent Users</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="pl-9 bg-background" />
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-4 text-muted-foreground">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No users found</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="p-3 rounded-lg bg-background border border-border/50">
                <div className="flex items-start gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-foreground text-background text-xs">
                      {user.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm truncate">{user.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${user.role === "faculty" ? "bg-muted text-foreground border-border/50" : ""}`}
                    >
                      {user.role}
                    </Badge>
                    <Badge
                      variant={user.verified ? "default" : "secondary"}
                      className={`text-xs ${user.verified ? "bg-accent/10 text-accent border-0" : "bg-destructive/10 text-destructive border-0"
                        }`}
                    >
                      {user.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {user.created_at ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true }) : 'Unknown'}
                  </span>
                </div>
              </div>
            )))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          View All Users
        </Button>
      </CardContent>
    </Card>
  )
}
