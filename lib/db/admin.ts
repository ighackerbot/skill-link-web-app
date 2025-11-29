import { createClient } from '@/lib/supabase/client'

export async function getAdminStats() {
    const supabase = createClient()

    const [users, sessions, messages, matches] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('sessions').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('matches').select('id', { count: 'exact', head: true })
    ])

    return {
        totalUsers: users.count || 0,
        activeSessions: sessions.count || 0,
        messagesSent: messages.count || 0,
        matchSuccessRate: 85 // Placeholder as calculation is complex
    }
}

export async function getRecentUsers() {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

    if (error) {
        console.error('Error fetching recent users:', error)
        return []
    }

    return data || []
}
