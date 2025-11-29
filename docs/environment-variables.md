# Environment Variables

## Required Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hejnedfijvtdhgvuafwh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Variable Descriptions

### `NEXT_PUBLIC_SUPABASE_URL`
- **Type**: Public
- **Description**: Your Supabase project URL
- **Example**: `https://hejnedfijvtdhgvuafwh.supabase.co`

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Type**: Public
- **Description**: Supabase anonymous/public key for client-side operations
- **Security**: Safe to expose in browser (has Row Level Security)

### `SUPABASE_SERVICE_ROLE_KEY`
- **Type**: Secret
- **Description**: Supabase service role key for server-side admin operations
- **Security**: **NEVER** expose this in client-side code
- **Usage**: Only used in server-side API routes and middleware

## Getting Your Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the required keys:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key

## Security Notes

- The `.env.local` file is gitignored by default
- Never commit sensitive keys to version control
- The `NEXT_PUBLIC_` prefix makes variables available in the browser
- Service role key should only be used server-side
