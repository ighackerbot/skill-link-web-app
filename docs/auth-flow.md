# Authentication Flow

## Overview
We use Supabase Auth with SSR support (`@supabase/ssr`).

## Middleware
`middleware.ts` runs on every request to:
1. Refresh the Supabase session.
2. Protect private routes.
3. Redirect unauthenticated users to `/login`.
4. Enforce role-based access (Admin, Faculty).

## Client-Side
`lib/supabase/client.ts` provides a singleton Supabase client for browser usage.

## Server-Side
`lib/supabase/server.ts` provides a helper to create a Supabase client in Server Components and API routes, handling cookie storage automatically.

## Admin Access
Admin access is restricted to a whitelist of emails defined in `lib/auth/admin-helpers.ts`.
