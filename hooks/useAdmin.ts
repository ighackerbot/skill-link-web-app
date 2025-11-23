import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { ADMIN_WHITELIST } from "@/lib/adminWhitelist"

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function useAdmin() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (!session) {
        setIsAdmin(false)
        setUser(null)
        setLoading(false)
        return
      }

      const email = session.user.email?.toLowerCase() || ""
      setUser(session.user)
      setIsAdmin(ADMIN_WHITELIST.includes(email))
      setLoading(false)
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  return { loading, isAdmin, user }
}
