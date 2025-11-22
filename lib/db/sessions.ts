import { createClient } from '@/lib/supabase/client'

/**
 * Get upcoming sessions for current user
 */
export async function getUpcomingSessions() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('sessions')
    .select(`
      *,
      mentor:users!sessions_mentor_id_fkey(id, name, avatar),
      learner:users!sessions_learner_id_fkey(id, name, avatar)
    `)
    .or(`mentor_id.eq.${user.id},learner_id.eq.${user.id}`)
    .eq('status', 'scheduled')
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(10)

  if (error) {
    console.error('Error fetching sessions:', error)
    return []
  }

  return data || []
}

