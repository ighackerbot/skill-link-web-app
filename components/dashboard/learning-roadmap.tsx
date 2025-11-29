"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Map } from "lucide-react"
import { useEffect, useState } from "react"
import { getRoadmap } from "@/lib/db/roadmap"
import type { Roadmap } from "@/lib/types"

export function LearningRoadmap() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const data = await getRoadmap()
        setRoadmap(data)
      } catch (error) {
        console.error('Error loading roadmap:', error)
      } finally {
        setLoading(false)
      }
    }
    loadRoadmap()
  }, [])

  if (loading) {
    return (
      <Card className="bg-surface border-border">
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading roadmap...
        </CardContent>
      </Card>
    )
  }

  if (!roadmap) {
    return (
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle>Learning Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-2">
          <Map className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No active roadmap</p>
          <p className="text-sm text-muted-foreground">Start a learning path to track progress</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate overall progress based on stages
  // Assuming stages have 'completed' boolean.
  // If stages structure is complex, we might need to adjust.
  // Based on types: stages: RoadmapStageData[]
  // RoadmapStageData has 'completed' and maybe we can infer progress.

  const totalStages = roadmap.stages.length
  const completedStages = roadmap.stages.filter(s => s.completed).length
  const overallProgress = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0

  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <CardTitle>Learning Roadmap: {roadmap.skill}</CardTitle>
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {roadmap.stages.map((stage) => (
          <div key={stage.id} className="space-y-2">
            <div className="flex items-start gap-3">
              {stage.completed ? (
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${stage.completed ? "line-through text-muted-foreground" : ""}`}>
                  {stage.title}
                </p>
                {/* If we had granular progress per stage, we could show it here. 
                    For now, assuming binary completion or we can add progress field to stage if needed. 
                    The mock had progress per goal. The type RoadmapStageData doesn't seem to have progress percentage, only completed boolean.
                */}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
