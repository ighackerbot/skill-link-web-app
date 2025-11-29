# Deploying SkillLink to Vercel

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Supabase project set up

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - SkillLink production ready"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/skill-link-web-app.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. **Add Environment Variables** (CRITICAL):
   Click "Environment Variables" and add:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://hejnedfijvtdhgvuafwh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlam5lZGZpanZ0ZGhndnVhZndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODgzMzUsImV4cCI6MjA3OTM2NDMzNX0.Ic7Ih7waYXGsdVf8DydF3sTIz4q0sOUWYSiBNM8yMfI
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlam5lZGZpanZ0ZGhndnVhZndoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzc4ODMzNSwiZXhwIjoyMDc5MzY0MzM1fQ.abGCmlGO8h9oyYig0kGxgrzP96clP108w7W8pPup65g
   ```

6. Click **"Deploy"**

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and add environment variables when asked

## Step 3: Configure Supabase

### Update Supabase Site URL

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel deployment URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: 
     - `https://your-app.vercel.app/**`
     - `http://localhost:3000/**` (for local development)

### Enable Email Auth (if needed)

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates if desired

## Step 4: Set Up Database Tables

Your Supabase database needs these tables. Run this SQL in the Supabase SQL Editor:

```sql
-- Users/Profiles table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  batch TEXT,
  role TEXT DEFAULT 'student',
  skills_known TEXT[],
  skills_learning TEXT[],
  goals TEXT,
  skill_points INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  matched_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  learner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration INTEGER,
  mode TEXT,
  status TEXT DEFAULT 'scheduled',
  meeting_link TEXT,
  location TEXT,
  rating INTEGER,
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  tags TEXT[],
  images TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  post_type TEXT DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Faculty slots table
CREATE TABLE IF NOT EXISTS faculty_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id UUID REFERENCES users(id) ON DELETE CASCADE,
  batch TEXT NOT NULL,
  topic TEXT,
  subject TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration INTEGER,
  capacity INTEGER DEFAULT 5,
  booked_count INTEGER DEFAULT 0,
  mode TEXT,
  meeting_link TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Slot bookings table
CREATE TABLE IF NOT EXISTS slot_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id UUID REFERENCES faculty_slots(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  attachments TEXT[],
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roadmaps table
CREATE TABLE IF NOT EXISTS roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill TEXT,
  stages JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE slot_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (customize as needed)
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view matches" ON matches FOR SELECT USING (
  auth.uid() = user_id OR auth.uid() = matched_user_id
);

CREATE POLICY "Users can view their sessions" ON sessions FOR SELECT USING (
  auth.uid() = mentor_id OR auth.uid() = learner_id
);

CREATE POLICY "Anyone can view posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Anyone can view faculty slots" ON faculty_slots FOR SELECT USING (true);
CREATE POLICY "Faculty can manage their slots" ON faculty_slots FOR ALL USING (auth.uid() = faculty_id);

CREATE POLICY "Users can view their bookings" ON slot_bookings FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can create bookings" ON slot_bookings FOR INSERT WITH CHECK (auth.uid() = student_id);
```

## Step 5: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the following:
   - ✅ Homepage loads
   - ✅ Login/Signup works
   - ✅ Dashboard displays (after login)
   - ✅ Admin panel accessible (with whitelisted email)
   - ✅ Dark mode toggle works

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` scripts are correct

### Database Connection Issues
- Verify Supabase URL and keys in Vercel environment variables
- Check Supabase project is active
- Ensure RLS policies allow access

### Authentication Issues
- Verify Site URL in Supabase matches Vercel URL
- Check redirect URLs are configured
- Clear browser cache and cookies

## Continuous Deployment

Once set up, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed
5. Update Supabase Site URL to match custom domain

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Supabase Logs**: Database query logs and errors
- **Error Tracking**: Consider adding Sentry for production

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Database tables created in Supabase
- [ ] RLS policies configured
- [ ] Site URL updated in Supabase
- [ ] Deployment successful
- [ ] Login/auth tested
- [ ] Admin access verified
