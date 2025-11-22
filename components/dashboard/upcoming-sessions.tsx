"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, MapPin, Calendar } from "lucide-react"
import { getUpcomingSessions } from "@/lib/db/sessions"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

export function UpcomingSessions() {
  const router = useRouter()
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSessions() {
      try {
        const data = await getUpcomingSessions()
        setSessions(data)
      } catch (error) {
        console.error('Error loading sessions:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSessions()
  }, [])

  const handleJoin = (session: any) => {
    if (session.meeting_link) {
      window.open(session.meeting_link, '_blank')
    } else {
      router.push(`/sessions/${session.id}`)
    }
  }

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled learning sessions</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/sessions">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-4 text-muted-foreground">Loading...</div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No upcoming sessions</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/sessions">Book a session</Link>
            </Button>
          </div>
        ) : (
          sessions.map((session) => {
            const partner = session.mentor?.id === session.learner_id ? session.learner : session.mentor
            const sessionDate = new Date(session.scheduled_at)
            const isToday = sessionDate.toDateString() === new Date().toDateString()
            
            return (
              <div key={session.id} className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={partner?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-foreground text-background">
                    {partner?.name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold mb-1">{session.skill}</h3>
                      <p className="text-sm text-muted-foreground">with {partner?.name || 'Unknown'}</p>
                    </div>
                    <Badge className="bg-muted text-foreground border-0">{session.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {isToday ? 'Today' : format(sessionDate, 'MMM d')}, {format(sessionDate, 'h:mm a')}
                    </div>
                    <span>•</span>
                    <span>{session.duration} min</span>
                    {session.mode === "online" ? (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          Virtual
                        </div>
                      </>
                    ) : (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {session.location || 'Location TBD'}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleJoin(session)}
                    >
                      {session.mode === 'online' ? 'Join Session' : 'View Details'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => router.push(`/sessions/${session.id}`)}>
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
