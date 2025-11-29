# API Routes

## Authentication
- `POST /api/auth/callback`: Handles Supabase OAuth/Magic link callbacks.

## Users
- `GET /api/users`: List users (Admin only).
- `GET /api/users/[id]`: Get user details.

## Posts
- `GET /api/posts`: Fetch feed posts.
- `POST /api/posts`: Create a new post.

## Office Hours
- `GET /api/office-hours`: List available slots.
- `POST /api/office-hours`: Create a slot (Faculty only).

*(Note: This list will be updated as we implement/verify endpoints)*
