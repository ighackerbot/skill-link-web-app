"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react"

const MOCK_POSTS = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      isAnonymous: false,
    },
    content:
      "Just had an amazing React session! Finally understand useCallback and useMemo. Thanks to everyone who helped me get here! 🚀",
    tags: ["React", "Web Dev"],
    likes: 24,
    comments: 5,
    timestamp: "2 hours ago",
    isLiked: false,
  },
  {
    id: "2",
    author: {
      name: "Anonymous",
      avatar: "/placeholder.svg?height=40&width=40",
      isAnonymous: true,
    },
    content:
      "Struggling with understanding time complexity in algorithms. Can someone explain O(n log n) in simple terms? Would love to schedule a session!",
    tags: ["Algorithms", "Help Needed"],
    likes: 12,
    comments: 8,
    timestamp: "4 hours ago",
    isLiked: true,
  },
  {
    id: "3",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      isAnonymous: false,
    },
    content:
      "Looking for 2-3 people to form a study group for the upcoming data structures exam. Planning to meet twice a week at the library. DM if interested!",
    tags: ["Study Group", "Data Structures"],
    likes: 18,
    comments: 12,
    timestamp: "6 hours ago",
    isLiked: false,
  },
]

export function FeedPosts() {
  return (
    <div className="space-y-4">
      {MOCK_POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

function PostCard({ post }: { post: (typeof MOCK_POSTS)[0] }) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  return (
    <Card className="bg-surface border-border">
      <CardContent className="p-6 space-y-4">
        {/* Post Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-brand text-white">
                {post.author.isAnonymous
                  ? "A"
                  : post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{post.author.isAnonymous ? "Anonymous" : post.author.name}</h3>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <p className="text-sm leading-relaxed">{post.content}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 ${isLiked ? "text-accent" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-accent" : ""}`} />
            <span className="text-sm">{likesCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">
            <Share2 className="w-4 h-4 mr-2" />
            <span className="text-sm">Share</span>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-3">
              {/* Mock Comments */}
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-brand text-white text-xs">ER</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-background rounded-lg p-3">
                    <h4 className="font-semibold text-xs mb-1">Emily Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Great explanation! I had the same confusion before.</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-3">1 hour ago</p>
                </div>
              </div>
            </div>

            {/* Add Comment */}
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-brand text-white text-xs">JD</AvatarFallback>
              </Avatar>
              <Input placeholder="Write a comment..." className="flex-1 bg-background" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
