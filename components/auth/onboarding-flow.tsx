"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

const COURSES = [
  "Computer Science 101",
  "Data Structures",
  "Algorithms",
  "Web Development",
  "Machine Learning",
  "Database Systems",
  "Operating Systems",
  "Software Engineering",
]

const SKILLS = [
  "Python",
  "JavaScript",
  "Java",
  "React",
  "Node.js",
  "SQL",
  "Git",
  "TypeScript",
  "C++",
  "Algorithm Design",
]

export function OnboardingFlow() {
  const [step, setStep] = useState(1)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [learningGoals, setLearningGoals] = useState("")

  const toggleSelection = (item: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item))
    } else {
      setter([...list, item])
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-surface rounded-lg border border-border p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {step} of 3</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
              <div className="h-full bg-brand transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>
          </div>

          {/* Step 1: Courses */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Select Your Courses</h2>
                <p className="text-muted-foreground">Choose the courses you're currently taking or interested in</p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {COURSES.map((course) => (
                    <Badge
                      key={course}
                      variant={selectedCourses.includes(course) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-brand/10"
                      onClick={() => toggleSelection(course, selectedCourses, setSelectedCourses)}
                    >
                      {course}
                      {selectedCourses.includes(course) && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add custom course..." className="bg-background" />
                  <Button variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Share Your Skills</h2>
                <p className="text-muted-foreground">
                  Let others know what you can help with and what you want to learn
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-brand/10"
                      onClick={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add custom skill..." className="bg-background" />
                  <Button variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Set Your Learning Goals</h2>
                <p className="text-muted-foreground">Tell us what you want to achieve this semester</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">Learning Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="E.g., Master React hooks, Improve algorithm skills, Build a full-stack app..."
                    className="bg-background min-h-32"
                    value={learningGoals}
                    onChange={(e) => setLearningGoals(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
              Back
            </Button>
            {step < 3 ? (
              <Button className="bg-brand hover:bg-brand-hover" onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              <Button className="bg-brand hover:bg-brand-hover">Complete Setup</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
