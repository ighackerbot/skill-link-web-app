import { supabaseAdmin } from "@/lib/supabaseServer"
import { isWhitelisted } from "@/lib/adminWhitelist"

export async function requireAdmin(request: Request) {
  const authHeader = request.headers.get("authorization") || ""
  const token = authHeader.replace(/^Bearer\s+/i, "")

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized: Missing token" }), {
      status: 401,
    })
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token)

  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Invalid or expired session token" }), {
      status: 401,
    })
  }

  const email = data.user.email ?? ""
  if (!isWhitelisted(email)) {
    return new Response(JSON.stringify({ error: "Admin access restricted" }), {
      status: 403,
    })
  }

  return data.user
}
