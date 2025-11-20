import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Sparkles } from "lucide-react"

const MOCK_MATCHES = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=48&width=48",
    bio: "CS Senior | React Expert | Looking to learn algorithms",
    matchScore: 95,
    commonCourses: ["Data Structures", "Web Development"],
    complementarySkills: ["React", "Python"],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=48&width=48",
    bio: "Math/CS Double Major | Algorithm enthusiast",
    matchScore: 88,
    commonCourses: ["Algorithms", "Database Systems"],
    complementarySkills: ["Algorithm Design", "SQL"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=48&width=48",
    bio: "Junior CS | Full-stack developer | Teaching JavaScript",
    matchScore: 82,
    commonCourses: ["Web Development"],
    complementarySkills: ["Node.js", "TypeScript"],
  },
]

export function MatchesSection() {
  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand" />
              Your Top Matches
            </CardTitle>
            <CardDescription>Students who complement your learning goals</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_MATCHES.map((match) => (
          <div
            key={match.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:border-brand/50 transition"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={match.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-brand text-white">
                {match.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{match.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{match.bio}</p>
                </div>
                <Badge variant="secondary" className="bg-brand/10 text-brand border-0">
                  {match.matchScore}% Match
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {match.complementarySkills.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-brand hover:bg-brand-hover">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
