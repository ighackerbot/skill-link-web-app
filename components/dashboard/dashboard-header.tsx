"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { AdminLink } from "@/components/auth/admin-link"
import { BookOpen, Bell, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-semibold">SkillLink</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium hover:text-foreground transition">
                Dashboard
              </Link>
              <Link href="/matches" className="text-sm text-muted-foreground hover:text-foreground transition">
                Matches
              </Link>
              <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition">
                Chat
              </Link>
              <Link href="/sessions" className="text-sm text-muted-foreground hover:text-foreground transition">
                Sessions
              </Link>
              <Link href="/feed" className="text-sm text-muted-foreground hover:text-foreground transition">
                Feed
              </Link>
              <AdminLink />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-64 pl-9 bg-card" />
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-foreground text-background">JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
