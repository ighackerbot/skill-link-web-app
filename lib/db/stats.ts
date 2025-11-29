import { createClient } from '@/lib/supabase/client'

export async function getUserStats() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Get user profile for points and streak
    const { data: profile } = await supabase
        .from('users')
        .select('skillPoints, streak')
        .eq('id', user.id)
        .single()

    // Get matches count
    const { count: matchesCount } = await supabase
        .from('matches')
        .select('id', { count: 'exact', head: true })
        .or(`userId.eq.${user.id},matchedUserId.eq.${user.id}`)

    // Get completed sessions count
    const { count: sessionsCount } = await supabase
        .from('sessions')
        .select('id', { count: 'exact', head: true })
        .or(`mentorId.eq.${user.id},learnerId.eq.${user.id}`)
        .eq('status', 'completed')

    return {
        activeMatches: matchesCount || 0,
        sessionsCompleted: sessionsCount || 0,
        skillPoints: profile?.skillPoints || 0,
        streak: profile?.streak || 0
    }
}
