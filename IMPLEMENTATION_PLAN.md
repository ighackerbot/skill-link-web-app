# SkillLink Implementation Plan

## 🎯 Overview
This document outlines the implementation plan for SkillLink based on the official specification.

## 📋 Priority Order (MVP First)

### Phase 1: Foundation (Week 1-2)
1. ✅ **Supabase Setup**
   - Install Supabase client
   - Configure environment variables
   - Set up database schema
   - Authentication setup

2. ✅ **Updated Authentication & Onboarding**
   - Add batch selection (2028/2029)
   - Update signup form
   - Email validation (.edu.in)
   - Enhanced onboarding flow

### Phase 2: Core Features (Week 3-4)
3. ✅ **Peer Matching (MVP)**
   - Update matching algorithm
   - Batch-aware matching
   - Enhanced filters
   - Session booking flow

4. ✅ **User Dashboard**
   - Batch-specific content
   - Enhanced stats
   - Roadmap preview

### Phase 3: Communication (Week 5)
5. ✅ **Chat + Session Booking**
   - Supabase Realtime integration
   - File attachments
   - Session booking from chat
   - Reminders

### Phase 4: Faculty Features (Week 6)
6. ✅ **Faculty Office Hours (Batch-Wise)**
   - Batch filter (MANDATORY)
   - 2028/2029 separation
   - Capacity management
   - Booking restrictions

### Phase 5: Learning Tools (Week 7)
7. ✅ **Roadmap Box Enhancement**
   - YouTube playlist integration
   - LeetCode problem links
   - GitHub resources
   - Progress tracking
   - Stage-based learning

### Phase 6: Social Features (Week 8-9)
8. ✅ **Social Feed Enhancement**
   - Anonymous posting
   - Image uploads
   - Club posts
   - Event announcements
   - Enhanced moderation

9. ✅ **Anonymous Communities**
   - Topic-based boards
   - Reddit-style threads
   - Upvote/downvote
   - Admin identity access

### Phase 7: Admin & Analytics (Week 10)
10. ✅ **Admin Dashboard**
    - Batch-level analytics
    - Platform insights
    - Enhanced moderation
    - User management

## 🗄️ Database Schema (Supabase)

### Tables Required

1. **users**
   - id (uuid, primary key)
   - email (text, unique)
   - name (text)
   - batch (text: '2028' | '2029')
   - role (text: 'student' | 'faculty' | 'admin')
   - skills_known (text[])
   - skills_learning (text[])
   - goals (text)
   - skillPoints (integer, default 0)
   - streak (integer, default 0)
   - verified (boolean, default false)
   - avatar_url (text)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **matches**
   - id (uuid, primary key)
   - user_id (uuid, foreign key → users)
   - matched_user_id (uuid, foreign key → users)
   - score (integer)
   - mutual_skills (text[])
   - status (text: 'pending' | 'accepted' | 'rejected')
   - created_at (timestamp)

3. **sessions**
   - id (uuid, primary key)
   - mentor_id (uuid, foreign key → users)
   - learner_id (uuid, foreign key → users)
   - skill (text)
   - scheduled_at (timestamp)
   - duration (integer, minutes)
   - mode (text: 'online' | 'offline')
   - status (text: 'scheduled' | 'completed' | 'cancelled')
   - meeting_link (text, nullable)
   - location (text, nullable)
   - rating (integer, nullable)
   - review (text, nullable)
   - created_at (timestamp)

4. **faculty_slots**
   - id (uuid, primary key)
   - faculty_id (uuid, foreign key → users)
   - batch (text: '2028' | '2029', NOT NULL)
   - topic (text)
   - subject (text)
   - scheduled_at (timestamp)
   - duration (integer, minutes)
   - capacity (integer)
   - booked_count (integer, default 0)
   - mode (text: 'online' | 'offline')
   - meeting_link (text, nullable)
   - location (text, nullable)
   - created_at (timestamp)

5. **slot_bookings**
   - id (uuid, primary key)
   - slot_id (uuid, foreign key → faculty_slots)
   - student_id (uuid, foreign key → users)
   - status (text: 'confirmed' | 'cancelled')
   - created_at (timestamp)

6. **roadmaps**
   - id (uuid, primary key)
   - user_id (uuid, foreign key → users)
   - skill (text)
   - stages (jsonb) - Array of stage objects
   - created_at (timestamp)
   - updated_at (timestamp)

7. **roadmap_stages**
   - id (uuid, primary key)
   - roadmap_id (uuid, foreign key → roadmaps)
   - stage_name (text: 'beginner' | 'intermediate' | 'advanced')
   - title (text)
   - description (text)
   - youtube_links (text[])
   - leetcode_problems (text[])
   - github_links (text[])
   - docs_links (text[])
   - practice_tasks (text[])
   - mini_projects (text[])
   - completed (boolean, default false)
   - completed_at (timestamp, nullable)
   - order (integer)

8. **feed_posts**
   - id (uuid, primary key)
   - author_id (uuid, foreign key → users)
   - content (text)
   - is_anonymous (boolean, default false)
   - tags (text[])
   - images (text[])
   - likes_count (integer, default 0)
   - comments_count (integer, default 0)
   - post_type (text: 'normal' | 'club' | 'event')
   - club_id (uuid, nullable, foreign key → clubs)
   - event_venue (text, nullable)
   - event_time (timestamp, nullable)
   - created_at (timestamp)
   - updated_at (timestamp)

9. **post_likes**
   - id (uuid, primary key)
   - post_id (uuid, foreign key → feed_posts)
   - user_id (uuid, foreign key → users)
   - created_at (timestamp)
   - Unique constraint: (post_id, user_id)

10. **post_comments**
    - id (uuid, primary key)
    - post_id (uuid, foreign key → feed_posts)
    - author_id (uuid, foreign key → users)
    - content (text)
    - is_anonymous (boolean, default false)
    - created_at (timestamp)

11. **communities**
    - id (uuid, primary key)
    - name (text, unique)
    - slug (text, unique)
    - description (text)
    - topic (text: 'dsa' | 'web-dev' | 'ui-ux' | 'maths' | 'placement-prep')
    - created_at (timestamp)

12. **community_threads**
    - id (uuid, primary key)
    - community_id (uuid, foreign key → communities)
    - author_id (uuid, foreign key → users)
    - title (text)
    - content (text)
    - upvotes (integer, default 0)
    - downvotes (integer, default 0)
    - comments_count (integer, default 0)
    - created_at (timestamp)
    - updated_at (timestamp)

13. **thread_comments**
    - id (uuid, primary key)
    - thread_id (uuid, foreign key → community_threads)
    - author_id (uuid, foreign key → users)
    - content (text)
    - upvotes (integer, default 0)
    - downvotes (integer, default 0)
    - created_at (timestamp)

14. **clubs**
    - id (uuid, primary key)
    - name (text, unique)
    - description (text)
    - avatar_url (text)
    - created_at (timestamp)

15. **messages**
    - id (uuid, primary key)
    - sender_id (uuid, foreign key → users)
    - receiver_id (uuid, foreign key → users)
    - content (text)
    - attachments (text[])
    - read (boolean, default false)
    - created_at (timestamp)

16. **reports**
    - id (uuid, primary key)
    - reported_by (uuid, foreign key → users)
    - reported_user_id (uuid, nullable, foreign key → users)
    - reported_post_id (uuid, nullable, foreign key → feed_posts)
    - reported_thread_id (uuid, nullable, foreign key → community_threads)
    - reason (text)
    - status (text: 'pending' | 'reviewed' | 'resolved')
    - created_at (timestamp)

## 🔧 Technical Implementation

### Supabase Setup
```bash
pnpm add @supabase/supabase-js
pnpm add @supabase/ssr  # For Next.js SSR
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Key Features to Implement

1. **Batch Filtering**
   - All faculty slots MUST have batch
   - Students can only see/book their batch slots
   - Admin can see all batches

2. **Anonymous Posting**
   - Frontend shows "Anonymous"
   - Backend stores real user_id
   - Admin can reveal identity

3. **Real-time Chat**
   - Use Supabase Realtime subscriptions
   - Presence tracking
   - Typing indicators

4. **Roadmap Integration**
   - YouTube API for playlists
   - LeetCode API for problems
   - GitHub links
   - Progress tracking

5. **Club Posts**
   - Special post type
   - Event cards
   - "Interested/Going" buttons

## 📝 Next Steps

1. Install Supabase dependencies
2. Create Supabase client utility
3. Set up database schema
4. Update authentication flow
5. Implement batch filtering
6. Add anonymous posting
7. Create communities feature
8. Enhance roadmap
9. Add admin analytics
10. Implement real-time chat

