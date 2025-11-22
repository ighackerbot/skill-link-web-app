# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: For production
NODE_ENV=development
```

## Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select an existing one
3. Go to Project Settings > API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Security Notes

- Never commit `.env.local` to git
- The `.env.local` file is already in `.gitignore`
- Service role key should only be used in server-side code
- Anon key is safe for client-side use

