# Project Structure

## Overview
SkillLink is a Next.js application using the App Router.

## Directory Layout

- **`app/`**: Contains the application routes, layouts, and pages.
    - `(auth)/`: Authentication related routes (login, signup).
    - `(dashboard)/`: Protected dashboard routes.
    - `admin/`: Admin specific routes.
    - `api/`: API route handlers.
    - `globals.css`: Global styles and Tailwind imports.
    - `layout.tsx`: Root layout.

- **`components/`**: Reusable UI components.
    - `ui/`: Shadcn UI components (buttons, inputs, etc.).
    - `auth/`: Authentication forms and components.
    - `dashboard/`: Dashboard widgets and layout components.

- **`lib/`**: Utility functions and libraries.
    - `supabase/`: Supabase client configuration (client & server).
    - `utils.ts`: General utility functions (cn, etc.).
    - `auth/`: Authentication helpers.

- **`hooks/`**: Custom React hooks.

- **`public/`**: Static assets (images, icons).

- **`types/`**: TypeScript type definitions (if not co-located).
