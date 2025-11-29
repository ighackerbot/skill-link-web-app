import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { isAdminEmail } from "@/lib/auth/admin-helpers"

export function useAdmin() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      const supabase = createClient()
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

      setUser(session.user)
      setIsAdmin(isAdminEmail(session.user.email))
      setLoading(false)
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  return { loading, isAdmin, user }
}
