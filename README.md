# SkillLink - Campus Peer Learning Platform

A full-stack Next.js application for campus peer learning, skill matching, and collaborative education.

## 🚀 Features

- **Skill Matching**: AI-powered matching based on complementary skills
- **Session Booking**: Schedule learning sessions with peers
- **Office Hours**: Faculty can manage availability and student bookings
- **Learning Roadmaps**: Track progress on learning goals
- **Admin Dashboard**: Platform analytics and user management
- **Dark Mode**: Full dark mode support
- **Real-time Updates**: Live data from Supabase

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## 📦 Quick Start

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/skill-link-web-app.git
cd skill-link-web-app
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
# or
pnpm install
```

3. **Set up environment variables**

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Run development server**
```bash
npm run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Project Structure](./docs/project-structure.md)
- [API Routes](./docs/api-routes.md)
- [Supabase Schema](./docs/supabase-schema.md)
- [Authentication Flow](./docs/auth-flow.md)

## 🔑 Admin Access

Admin features are restricted to whitelisted emails:
- anuj.jain@adypu.edu.in
- suvendu.sahoo@adypu.edu.in
- Bharat.Singh@adypu.edu.in

Edit `lib/auth/admin-helpers.ts` to modify the whitelist.

## 🎨 Features by Role

### Students
- Find skill matches
- Book learning sessions
- Track learning progress
- Book faculty office hours
- Participate in feed discussions

### Faculty
- Create office hour slots
- Manage student appointments
- Batch-based scheduling (2028/2029)
- Online/offline session modes

### Admins
- User management
- Platform analytics
- Content moderation
- System settings

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Admin access via email whitelist
- Service role key only used server-side
- Secure session management with Supabase SSR

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues or questions:
- Check the [documentation](./docs/)
- Review [Supabase logs](https://supabase.com/dashboard)
- Open an issue on GitHub

---

**Made with ❤️ for campus learning communities**
