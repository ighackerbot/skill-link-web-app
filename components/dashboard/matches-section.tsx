"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Sparkles, Users } from "lucide-react"
import { getMatches } from "@/lib/db/matches"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function MatchesSection() {
  const router = useRouter()
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await getMatches(3)
        setMatches(data)
      } catch (error) {
        console.error('Error loading matches:', error)
      } finally {
        setLoading(false)
      }
    }
    loadMatches()
  }, [])

  const handleMessage = (userId: string) => {
    router.push(`/chat?user=${userId}`)
  }

  const handleBookSession = (userId: string) => {
    router.push(`/sessions?book=${userId}`)
  }

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-foreground" />
              Your Top Matches
            </CardTitle>
            <CardDescription>Students who complement your learning goals</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/matches">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading matches...</div>
        ) : matches.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <Users className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No matches yet</p>
            <p className="text-sm text-muted-foreground">Complete your profile to find matches</p>
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50 hover:border-border transition"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={match.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-foreground text-background">
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
                  <Badge variant="secondary" className="bg-muted text-foreground border-0">
                    {match.matchScore}% Match
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {match.complementarySkills?.slice(0, 2).map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleMessage(match.id)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleBookSession(match.id)}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Book Session
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
