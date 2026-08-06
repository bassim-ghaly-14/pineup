# PineUp 🌲

**A modern social networking platform** built for meaningful connections, sharing moments, and growing communities.

> **Stack:** Next.js 16 · React 19 · TypeScript · MUI v9 · TanStack Query v5 · Tailwind CSS v4

---

## ✨ Features

### 🔐 Authentication

- JWT-based login/registration with token persistence (localStorage + cookies)
- Auth guard middleware protecting profile, bookmarks, notifications, settings, and suggestions
- Password change with current password verification
- Profile photo upload with progress tracking
- Account switcher for multiple accounts

### 📝 Posts & Feed

- Create, edit, and delete posts with optional image uploads
- Public/private/friends privacy controls
- **Explore feed** (public posts) and **Following feed** (posts from followed users)
- Infinite scroll pagination with feed ranking
- Post sharing (repost) functionality
- Like/unlike and bookmark/unbookmark posts

### 💬 Comments & Replies

- Nested comments with reply threads
- Create, edit, delete comments
- Like/unlike comments
- Real-time reply counts

### 🔔 Notifications

- Real-time notification bell with unread count badge
- Notification types: post likes, comments, replies, follows, shares
- Mark individual notifications as read or mark all as read
- Dropdown quick-view and full-page notification list

### 👤 User Profiles

- Profile pages with cover photo, avatar, bio, and stats
- Followers / following lists
- User posts feed on profile
- Profile actions (follow/unfollow)

### 🔍 Search

- Client-side fuzzy search powered by **Fuse.js**
- Searchable user index with name and username matching
- Offline-first local user index with scoring

### 👥 Social Graph

- Follow/unfollow users
- Suggested accounts for discovery
- Verified user badges for designated accounts
- User indexer that builds a local search cache

### 🎨 Theme & Design

- **Full light/dark mode** with MUI theming
- Gold primary palette (`#D4A63A`) with glassmorphism aesthetics
- Custom design tokens: radius (sm 10px → xl 20px), motion (fast 0.2s → slow 0.3s), elevation (subtle → modal)
- Responsive 3-column layout: sidebar | content | right sidebar
- Mobile bottom navigation bar
- Framer Motion animations
- Custom scrollbar gutter for layout stability

### 🌍 Campaign

- Palestine awareness banner on the feed page
- Informational dialog with campaign details

### ⚡ Performance & UX

- TanStack React Query with optimized stale/garbage-collection times
- Request deduplication and debounced search
- Optimistic updates for likes, bookmarks, follows
- Loader, empty state, error state, and skeleton components
- Sonner toast notifications for feedback

---

## 🗂️ Project Structure

```
pineup/
├── app/                          # Next.js App Router pages
│   ├── (public)/                 # Public routes (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/              # Authenticated routes
│   │   ├── feed/
│   │   ├── profile/
│   │   │   └── [id]/
│   │   │       ├── followers/
│   │   │       └── following/
│   │   ├── posts/[id]/
│   │   ├── bookmarks/
│   │   ├── notifications/
│   │   ├── settings/
│   │   ├── suggestions/
│   │   └── search/
│   ├── api/
│   │   └── download-image/       # Image proxy API route
│   ├── layout.tsx
│   ├── page.tsx                  # Redirects to /feed
│   └── globals.css
│
├── src/
│   ├── components/
│   │   ├── common/               # Shared UI components
│   │   │   ├── app-dialog.tsx
│   │   │   ├── app-logo.tsx
│   │   │   ├── app-state.tsx
│   │   │   ├── confirm-dialog.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-state.tsx
│   │   │   ├── glass-card.tsx
│   │   │   ├── icon-button.tsx
│   │   │   ├── image-preview.tsx
│   │   │   ├── image-preview-modal.tsx
│   │   │   ├── linkify-text.tsx
│   │   │   ├── loader.tsx
│   │   │   ├── page-container.tsx
│   │   │   ├── page-header.tsx
│   │   │   ├── search-input.tsx
│   │   │   ├── section-card.tsx
│   │   │   ├── user-avatar.tsx
│   │   │   └── verified-badge.tsx
│   │   └── layout/               # Shell layout components
│   │       ├── app-shell.tsx
│   │       ├── mobile-nav/
│   │       ├── navbar/
│   │       ├── right-sidebar/
│   │       ├── sidebar/
│   │       └── user-menu/
│   │
│   ├── features/                 # Feature-based modules
│   │   ├── auth/                 # Authentication (login, register, profile, password, upload)
│   │   ├── posts/                # Posts CRUD, feed, likes, bookmarks, sharing
│   │   ├── comments/             # Comments & replies with likes
│   │   ├── notifications/        # Real-time notifications
│   │   ├── profile/              # Profile display, stats, tabs
│   │   ├── search/               # Search results display
│   │   ├── social/               # User index, search, social graph
│   │   ├── users/                # User cards, follow/unfollow, bookmarks, suggestions
│   │   └── campaign/             # Palestine awareness campaign
│   │
│   ├── constants/                # Routes, query keys, storage keys, theme, verified users
│   ├── lib/                      # Core utilities (query client, WebSocket, analytics, event bus)
│   ├── services/                 # API layer (Axios instance, endpoints, interceptors, normalizer)
│   ├── types/                    # Shared TypeScript types (API, common, pagination)
│   └── utils/                    # Utility functions (error handling, formatting, debounce, etc.)
│
├── public/                       # Static assets (favicon, OG image, logos, icons)
├── middleware.ts                 # Auth middleware (cookie-based JWT check)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/bassim-ghaly-14/pineup.git
cd pineup

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with:
NEXT_PUBLIC_API_URL=https://your-api-url.com

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

---

## 📦 Key Dependencies

| Package                         | Purpose                           |
| ------------------------------- | --------------------------------- |
| `next` 16.2.9                   | React framework with App Router   |
| `react` 19.2.4                  | UI library                        |
| `@mui/material` 9.1.2           | Material Design component library |
| `@mui/icons-material` 9.1.1     | Material Design icons             |
| `@tanstack/react-query` 5.101.1 | Server state management           |
| `axios` 1.18.1                  | HTTP client                       |
| `zod` 4.4.3                     | Schema validation                 |
| `react-hook-form` 7.80.0        | Form management                   |
| `framer-motion` 12.42.0         | Animations                        |
| `fuse.js` 7.4.2                 | Client-side fuzzy search          |
| `dayjs` 1.11.21                 | Date formatting                   |
| `sonner` 2.0.7                  | Toast notifications               |
| `react-dropzone` 15.0.0         | File uploads                      |
| `jwt-decode` 4.0.0              | JWT token decoding                |
| `tailwindcss` 4                 | Utility CSS                       |

---

## 🔌 API Endpoints

The app communicates with a REST API via Axios. Key endpoint groups:

| Group             | Endpoints                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Auth**          | Signup, Signin, Change Password, Upload Photo, Profile                                    |
| **Users**         | Bookmarks, Suggestions, Profile by ID, Follow, Posts by User                              |
| **Posts**         | Create, GetAll, Feed, Get/Update/Delete by ID, Likes, Toggle Like, Toggle Bookmark, Share |
| **Comments**      | List, Create, Update, Delete, Toggle Like, Replies, Create Reply                          |
| **Notifications** | GetAll, Unread Count, Mark Read, Mark All Read                                            |

---

## 🧠 Architecture Highlights

- **Feature-based modular structure** — Each feature (auth, posts, comments, etc.) is self-contained with its own components, hooks, services, types, and validation.
- **TanStack Query** — Centralized query client with 30s stale time, 10min GC, retry logic, and optimistic updates.
- **WebSocket** — `PineSocket` class for real-time connections (notifications, live updates).
- **Social Index** — Local client-side user index stored in localStorage, populated from API responses, enabling offline-first search via Fuse.js.
- **Image Proxy** — A Next.js API route (`/api/download-image`) proxies image downloads from allowed hosts (route-posts.routemisr.com, \*.r2.dev) for CORS-safe client downloads.
- **Auth** — Token stored in both `localStorage` and a cookie (`pineup_token`). Middleware checks cookie for protected routes. `useAuth` hook listens to `auth-change` events for cross-tab sync.

---

## 🔐 Environment Variables

| Variable              | Description                  |
| --------------------- | ---------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL for the backend API |

---

## 📄 License

This project is private.

---

## 👤 Author

**CHEF-BELLY** — Creator & Developer
