import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, MapPin } from "lucide-react"

const MOCK_SESSIONS = [
  {
    id: "1",
    title: "React Hooks Deep Dive",
    partner: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "Today, 2:00 PM",
    duration: "1 hour",
    type: "virtual",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Algorithm Practice Session",
    partner: "Marcus Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "Tomorrow, 10:00 AM",
    duration: "1.5 hours",
    type: "in-person",
    location: "Library Room 301",
    status: "upcoming",
  },
]

export function UpcomingSessions() {
  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled learning sessions</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_SESSIONS.map((session) => (
          <div key={session.id} className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
            <Avatar className="w-10 h-10">
              <AvatarImage src={session.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-brand text-white">
                {session.partner
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold mb-1">{session.title}</h3>
                  <p className="text-sm text-muted-foreground">with {session.partner}</p>
                </div>
                <Badge className="bg-accent/10 text-accent border-0">{session.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {session.time}
                </div>
                <span>•</span>
                <span>{session.duration}</span>
                {session.type === "virtual" ? (
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
                      {session.location}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-brand hover:bg-brand-hover">
                  Join Session
                </Button>
                <Button size="sm" variant="outline">
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
