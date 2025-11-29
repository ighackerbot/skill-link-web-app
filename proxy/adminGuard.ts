import { createClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth/admin-helpers"
import { NextResponse } from "next/server"

export async function requireAdmin() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Admin access restricted" }, { status: 403 })
  }

  return user
}
