"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, X } from "lucide-react"

const SUGGESTED_TAGS = ["React", "Algorithms", "Python", "Web Dev", "Help Needed", "Study Group"]

export function CreatePost() {
  const [content, setContent] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <Card className="bg-surface border-border">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-brand text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts, ask questions, or find study partners..."
              className="min-h-24 bg-background border-border resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-brand/10"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ImageIcon className="w-4 h-4 mr-2" />
                Add Image
              </Button>
              <div className="flex items-center gap-2">
                <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                  Post anonymously
                </Label>
              </div>
            </div>
            <Button className="bg-brand hover:bg-brand-hover">Post</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
