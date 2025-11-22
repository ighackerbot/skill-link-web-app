"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the React session!",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you tomorrow at 10am",
    timestamp: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can we reschedule?",
    timestamp: "3h ago",
    unread: 1,
    online: false,
  },
  {
    id: "4",
    name: "Alex Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "That explanation was perfect",
    timestamp: "1d ago",
    unread: 0,
    online: false,
  },
]

export function ChatSidebar() {
  const [selectedChat, setSelectedChat] = useState("1")

  return (
    <aside className="w-80 border-r border-border/50 bg-card flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="search" placeholder="Search conversations..." className="pl-9 bg-background" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {MOCK_CONVERSATIONS.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 cursor-pointer hover:bg-background transition ${
              selectedChat === conversation.id ? "bg-background border-l-2 border-brand" : ""
            }`}
            onClick={() => setSelectedChat(conversation.id)}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-brand text-white">
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-surface" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <Badge className="ml-2 bg-brand text-white border-0 text-xs px-1.5 py-0">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
