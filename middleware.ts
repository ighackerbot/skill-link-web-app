import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_EMAILS } from '@/lib/auth/admin-helpers'

export async function middleware(request: NextRequest) {
  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    // Allow request to continue but log error
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }: { name: string, value: string, options: any }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            cookiesToSet.forEach(({ name, value, options }: { name: string, value: string, options: any }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Supabase auth error in middleware:', error)
    }

    // Protected routes logic
    const path = request.nextUrl.pathname

    // Admin routes protection
    if (path.startsWith('/admin')) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      const userEmail = user.email?.toLowerCase()
      const isAdmin = ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === userEmail)

      if (!isAdmin) {
        // Return 403 for API routes, redirect for pages
        if (path.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Admin access restricted — invalid admin account.' },
            { status: 403 }
          )
        }
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    // Dashboard protection (Student/Faculty)
    if (path.startsWith('/dashboard') || path.startsWith('/matches') || path.startsWith('/feed')) {
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    // Auth routes (login/signup) - redirect to dashboard if already logged in
    if (path === '/login' || path === '/signup') {
      if (user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    // Allow request to continue on error
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
