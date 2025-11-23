import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookOpen, Users, Calendar, TrendingUp, Award, MessageSquare } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-semibold">SkillLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Connect. Learn. <span className="text-foreground">Grow Together.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
            Your campus-first peer learning platform. Match with students who share your goals, book sessions with
            experts, and accelerate your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <Link href="/signup">Join SkillLink</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-muted-foreground">Powerful tools designed for student collaboration</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Smart Matching"
            description="Our TF-IDF algorithm connects you with peers who complement your learning goals and skillset."
          />
          <FeatureCard
            icon={<Calendar className="w-6 h-6" />}
            title="Session Booking"
            description="Schedule 1-on-1 sessions with classmates or faculty office hours with ease."
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Real-Time Chat"
            description="Instant messaging with match suggestions and session coordination built-in."
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Learning Roadmaps"
            description="Track your progress across courses and see recommended next steps."
          />
          <FeatureCard
            icon={<Award className="w-6 h-6" />}
            title="SkillPoints"
            description="Earn points for teaching, learning, and contributing to the community."
          />
          <FeatureCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Faculty Integration"
            description="Connect directly with professors for guidance and office hour scheduling."
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SkillLink Works</h2>
            <p className="text-lg text-muted-foreground">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="01"
              title="Create Your Profile"
              description="Share your courses, skills, and learning goals to get personalized matches."
            />
            <StepCard
              number="02"
              title="Connect & Chat"
              description="Browse curated matches, send messages, and schedule learning sessions."
            />
            <StepCard
              number="03"
              title="Learn & Earn"
              description="Attend sessions, track progress, and earn SkillPoints as you grow."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-card rounded-lg p-12 border border-border/50 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students already connected on SkillLink
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SkillLink. Empowering campus learning.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border/50 hover:border-border transition-all group shadow-sm hover:shadow-md">
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 text-foreground group-hover:bg-foreground group-hover:text-background transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-foreground font-bold text-xl">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
