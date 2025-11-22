# Quick Start Guide

## ✅ Environment Setup Complete

Your Supabase credentials have been configured in `.env.local`.

## 🗄️ Next Step: Set Up Database

### 1. Run the Database Schema

1. Go to your Supabase project: https://hejnedfijvtdhgvuafwh.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Open the file `supabase/schema.sql` from this project
4. Copy the entire SQL script
5. Paste it into the SQL Editor
6. Click **Run** to execute the schema

This will create all 16 tables needed for SkillLink:
- users
- matches
- sessions
- faculty_slots
- slot_bookings
- roadmaps
- roadmap_stages
- clubs
- feed_posts
- post_likes
- post_comments
- communities
- community_threads
- thread_comments
- messages
- reports

### 2. Verify Tables Created

After running the schema:
1. Go to **Table Editor** in Supabase
2. Verify all tables are listed
3. Check that indexes and triggers are created

### 3. Set Up Authentication

1. Go to **Authentication** > **Providers** in Supabase
2. Enable **Email** provider
3. Configure email templates (optional)
4. Set up redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - Your production URL (when deployed)

## 🚀 Start Development

```bash
# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`

## 📝 Important Notes

### Batch Requirements
- All faculty slots MUST have a batch (2028 or 2029)
- Students can only book slots for their own batch
- Batch filter is mandatory before viewing slots

### Environment Variables
- `.env.local` is already in `.gitignore`
- Never commit your `.env.local` file
- Service role key should be added for admin operations (server-side only)

## 🔧 Testing Supabase Connection

You can test the connection by:
1. Starting the dev server: `pnpm dev`
2. The Supabase client will automatically use your `.env.local` variables
3. Check browser console for any connection errors

## 📚 Next Implementation Steps

1. **Connect Authentication** (Priority 1)
   - Update login/signup to use Supabase Auth
   - Save user data with batch information

2. **Implement Onboarding**
   - Save skills_known and skills_learning
   - Save learning goals

3. **Build Matching System**
   - Connect to database
   - Implement batch-aware matching

4. **Faculty Office Hours**
   - Add batch filter (MANDATORY)
   - Implement booking restrictions

See `IMPLEMENTATION_PLAN.md` for the complete roadmap.

---

**Status**: ✅ Environment configured, ready for database setup!

