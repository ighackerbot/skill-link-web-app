import { supabaseAdmin } from "@/lib/supabaseServer"
import { requireAdmin } from "@/middleware/adminGuard"

export async function GET(request: Request) {
  const adminUser = await requireAdmin(request)
  if (adminUser instanceof Response) {
    return adminUser
  }

  const [users, sessions, posts, officeHours, matches] = await Promise.all([
    supabaseAdmin.from("users").select("id"),
    supabaseAdmin.from("sessions").select("id,status"),
    supabaseAdmin.from("feed_posts").select("id"),
    supabaseAdmin.from("office_hours").select("id"),
    supabaseAdmin.from("matches").select("id"),
  ])

  return new Response(
    JSON.stringify({
      totalUsers: users.data?.length ?? 0,
      activeSessions: sessions.data?.filter((s) => s.status === "active").length ?? 0,
      feedPosts: posts.data?.length ?? 0,
      officeHours: officeHours.data?.length ?? 0,
      matches: matches.data?.length ?? 0,
    }),
    { status: 200 }
  )
}
