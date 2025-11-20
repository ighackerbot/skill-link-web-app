import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Video, MapPin, Calendar } from "lucide-react"

const UPCOMING_SESSIONS = [
  {
    id: "1",
    title: "React Hooks",
    partner: "Sarah Chen",
    date: "Nov 18",
    time: "2:00 PM",
    type: "virtual",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Algorithms",
    partner: "Marcus Johnson",
    date: "Nov 20",
    time: "10:00 AM",
    type: "in-person",
    location: "Library 301",
    status: "confirmed",
  },
  {
    id: "3",
    title: "TypeScript",
    partner: "Emily Rodriguez",
    date: "Nov 22",
    time: "3:00 PM",
    type: "virtual",
    status: "pending",
  },
]

export function SessionsList() {
  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {UPCOMING_SESSIONS.map((session) => (
          <div key={session.id} className="p-4 rounded-lg bg-background border border-border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold mb-1">{session.title}</h4>
                <p className="text-sm text-muted-foreground">with {session.partner}</p>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  session.status === "confirmed"
                    ? "bg-accent/10 text-accent"
                    : "bg-accent-secondary/10 text-accent-secondary"
                } border-0 text-xs`}
              >
                {session.status}
              </Badge>
            </div>

            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {session.type === "virtual" ? (
                  <>
                    <Video className="w-3.5 h-3.5" />
                    <span>Virtual</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{session.location}</span>
                  </>
                )}
              </div>
            </div>

            {session.status === "confirmed" && (
              <Button size="sm" className="w-full bg-brand hover:bg-brand-hover">
                Join Session
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
