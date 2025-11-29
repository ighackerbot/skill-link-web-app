# Supabase Schema

## Tables

### `profiles`
- `id`: UUID (Primary Key, references auth.users)
- `email`: Text
- `full_name`: Text
- `role`: Text ('student', 'faculty', 'admin')
- `avatar_url`: Text
- `bio`: Text
- `skills`: Text[]
- `created_at`: Timestamp

### `posts`
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key -> profiles.id)
- `content`: Text
- `created_at`: Timestamp

### `office_hours`
- `id`: UUID (Primary Key)
- `faculty_id`: UUID (Foreign Key -> profiles.id)
- `start_time`: Timestamp
- `end_time`: Timestamp
- `is_booked`: Boolean
- `student_id`: UUID (Foreign Key -> profiles.id, nullable)

*(Schema to be verified against actual Supabase instance)*
