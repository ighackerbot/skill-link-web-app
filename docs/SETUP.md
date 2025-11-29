# SkillLink Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Supabase account and project

## Quick Start

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
# or
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hejnedfijvtdhgvuafwh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

See [Environment Variables Documentation](./environment-variables.md) for details.

### 3. Run Development Server

```bash
npm run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
skill-link-web-app/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # Student dashboard
│   ├── faculty/           # Faculty pages
│   ├── matches/           # Skill matching
│   ├── office-hours/      # Office hours booking
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── admin/            # Admin components
│   ├── dashboard/        # Dashboard components
│   ├── faculty/          # Faculty components
│   └── matches/          # Match components
├── lib/                   # Utilities and helpers
│   ├── supabase/         # Supabase clients
│   ├── db/               # Database helpers
│   └── auth/             # Auth helpers
├── docs/                  # Documentation
└── public/               # Static assets
```

## Admin Access

Only whitelisted emails can access admin features:
- anuj.jain@adypu.edu.in
- suvendu.sahoo@adypu.edu.in
- Bharat.Singh@adypu.edu.in

See `lib/auth/admin-helpers.ts` to modify the whitelist.

## Features

### Student Features
- ✅ Skill-based matching
- ✅ Session booking
- ✅ Dashboard with stats
- ✅ Learning roadmap
- ✅ Office hours booking

### Faculty Features
- ✅ Office hours management
- ✅ Batch-based slot creation
- ✅ Student appointment tracking

### Admin Features
- ✅ User management
- ✅ Platform analytics
- ✅ Content moderation
- ✅ System settings

## Supabase Schema

The app expects the following tables in Supabase:

- `users` (profiles)
- `matches`
- `sessions`
- `posts`
- `messages`
- `faculty_slots`
- `slot_bookings`
- `roadmaps`

See [Supabase Schema Documentation](./supabase-schema.md) for details.

## Troubleshooting

### Environment Variables Not Loading
- Restart the dev server after creating `.env.local`
- Ensure variables start with `NEXT_PUBLIC_` for client-side access

### Supabase Connection Issues
- Verify your project URL and keys in Supabase dashboard
- Check that Row Level Security (RLS) policies are configured

### Build Errors
- Run `npm install --legacy-peer-deps` to resolve peer dependency conflicts
- Clear `.next` folder: `rm -rf .next`

## Development

### Adding New Features
1. Create components in `components/`
2. Add database helpers in `lib/db/`
3. Create pages in `app/`
4. Update documentation

### Code Style
- Use TypeScript for type safety
- Follow existing component patterns
- Use Shadcn UI components
- Implement proper error handling

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
Add the same variables from `.env.local` to your hosting platform's environment settings.

## Support

For issues or questions:
- Check documentation in `/docs`
- Review Supabase logs
- Check browser console for errors
