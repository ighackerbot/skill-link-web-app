"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, MapPin } from "lucide-react"

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  partner?: {
    name: string
    avatar: string
  }
}

export function BookingModal({ open, onOpenChange, partner }: BookingModalProps) {
  const [sessionType, setSessionType] = useState<"virtual" | "in-person">("virtual")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border-border max-w-lg">
        <DialogHeader>
          <DialogTitle>Book a Learning Session</DialogTitle>
          <DialogDescription>Schedule a session with your match to collaborate and learn together</DialogDescription>
        </DialogHeader>

        {partner && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
            <Avatar className="w-10 h-10">
              <AvatarImage src={partner.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-brand text-white">
                {partner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{partner.name}</p>
              <p className="text-xs text-muted-foreground">Your learning partner</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Session Title</Label>
            <Input id="title" placeholder="e.g., React Hooks Deep Dive" className="bg-background" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What do you want to cover in this session?"
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" className="bg-background" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select>
              <SelectTrigger id="duration" className="bg-background">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Session Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSessionType("virtual")}
                className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                  sessionType === "virtual" ? "border-brand bg-brand/5" : "border-border hover:border-brand/50"
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="font-medium text-sm">Virtual</span>
              </button>
              <button
                onClick={() => setSessionType("in-person")}
                className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                  sessionType === "in-person" ? "border-brand bg-brand/5" : "border-border hover:border-brand/50"
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium text-sm">In Person</span>
              </button>
            </div>
          </div>

          {sessionType === "in-person" && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Library Room 301" className="bg-background" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1 bg-brand hover:bg-brand-hover">Send Booking Request</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
