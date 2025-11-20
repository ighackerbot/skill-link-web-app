"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Calendar, MoreVertical, Video } from "lucide-react"

const MOCK_MESSAGES = [
  {
    id: "1",
    senderId: "2",
    content: "Hey! Thanks for accepting my match request",
    timestamp: "10:30 AM",
    isSender: false,
  },
  {
    id: "2",
    senderId: "1",
    content: "Of course! I saw we both need help with React",
    timestamp: "10:32 AM",
    isSender: true,
  },
  {
    id: "3",
    senderId: "2",
    content: "Yeah! I struggle with hooks. Would you be free for a session this week?",
    timestamp: "10:33 AM",
    isSender: false,
  },
  {
    id: "4",
    senderId: "1",
    content: "Definitely! How about Thursday at 2 PM?",
    timestamp: "10:35 AM",
    isSender: true,
  },
  {
    id: "5",
    senderId: "2",
    content: "Perfect! Should we meet virtually or in person?",
    timestamp: "10:36 AM",
    isSender: false,
  },
]

export function ChatWindow() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-border-subtle bg-surface flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-brand text-white">SC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Sarah Chen</h3>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Video className="w-4 h-4 mr-2" />
            Video Call
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Book Session
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {MOCK_MESSAGES.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.isSender ? "flex-row-reverse" : ""}`}>
            {!msg.isSender && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-brand text-white text-xs">SC</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-md ${msg.isSender ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.isSender ? "bg-brand text-white" : "bg-surface border border-border"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border-subtle bg-surface">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-background"
          />
          <Button size="icon" className="bg-brand hover:bg-brand-hover">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
