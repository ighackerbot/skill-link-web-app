import { createClient } from '@/lib/supabase/client'
import type { Roadmap } from '@/lib/types'

export async function getRoadmap() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('userId', user.id)
        .single()

    if (error) {
        // If no roadmap found, return null (component should handle empty state)
        return null
    }

    return data as Roadmap
}
