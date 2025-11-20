import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Star } from "lucide-react"

const MOCK_MATCHES = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: ["Sarah Chen", "Marcus Johnson", "Emily Rodriguez", "Alex Kumar", "Jessica Williams", "David Park"][i % 6],
  avatar: "/placeholder.svg?height=80&width=80",
  bio: "Computer Science major passionate about building impactful software",
  matchScore: 95 - i * 3,
  courses: ["Web Development", "Data Structures"],
  skills: ["React", "Python", "Node.js"].slice(0, 2 + (i % 2)),
  skillPoints: 1000 + i * 150,
}))

export function MatchGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {MOCK_MATCHES.length} matches</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Sort by Match Score
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {MOCK_MATCHES.map((match) => (
          <Card key={match.id} className="bg-surface border-border hover:border-brand/50 transition">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={match.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-brand text-white">
                    {match.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold">{match.name}</h3>
                    <Badge variant="secondary" className="bg-brand/10 text-brand border-0 text-xs">
                      {match.matchScore}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{match.bio}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-accent-secondary text-accent-secondary" />
                    <span>{match.skillPoints} SkillPoints</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {match.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" className="flex-1 bg-brand hover:bg-brand-hover">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Calendar className="w-3 h-3 mr-1" />
                    Book
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
