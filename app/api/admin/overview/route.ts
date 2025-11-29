import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/proxy/adminGuard"
import { NextResponse } from "next/server"

export async function GET() {
  const adminUser = await requireAdmin()
  if (adminUser instanceof NextResponse) {
    return adminUser
  }

  const supabase = await createClient()

  const [users, sessions, posts, officeHours, matches] = await Promise.all([
    supabase.from("profiles").select("id", { count: 'exact', head: true }),
    supabase.from("sessions").select("id", { count: 'exact', head: true }).eq("status", "active"),
    supabase.from("posts").select("id", { count: 'exact', head: true }),
    supabase.from("office_hours").select("id", { count: 'exact', head: true }),
    supabase.from("matches").select("id", { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    totalUsers: users.count ?? 0,
    activeSessions: sessions.count ?? 0,
    feedPosts: posts.count ?? 0,
    officeHours: officeHours.count ?? 0,
    matches: matches.count ?? 0,
  })
}
