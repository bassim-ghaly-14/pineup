# PineUp

A modern social networking platform built with Next.js App Router, TypeScript, Material UI, Tailwind CSS, React Query, and a scalable feature-based architecture.

---

# Overview

PineUp is a social platform that allows users to:

- Create and manage posts
- Follow users
- Like, bookmark, and share content
- Comment and reply
- Receive notifications
- Manage multiple accounts
- Customize application theme

The project is designed with scalability and maintainability in mind using a feature-driven architecture.

---

# Tech Stack

## Framework

- Next.js 16
- React 19
- TypeScript

## UI

- Material UI
- Tailwind CSS
- Framer Motion

## State Management

- TanStack React Query
- React Context

## Forms & Validation

- React Hook Form
- Zod

## Networking

- Axios
- Custom API service layer

## Utilities

- Day.js
- Sonner Notifications
- Fuse.js Search

---

# Project Structure

pineup

├── app
│ ├── (protected)
│ ├── (public)
│ ├── api
│ └── layouts

├── src

│ ├── components
│ │
│ ├── features
│ │
│ ├── services
│ │
│ ├── constants
│ │
│ ├── hooks
│ │
│ ├── lib
│ │
│ ├── types
│ │
│ └── utils

├── public

## └── middleware.ts

# Architecture Philosophy

PineUp follows a feature-based architecture.

Each feature owns:

- Components
- Hooks
- Services
- Types
- Business logic

Example:
features/posts

├── components
├── hooks
├── services
├── types
└── utils
This prevents the project from becoming a large collection of unrelated files.

---

# Installation

## Requirements

Node:
Node >= 20
Package manager:

---

## Install dependencies

````bash
npm install
Environment Variables

Create:
.env.local
Example:
NEXT_PUBLIC_API_URL=https://your-api-url.com

Development
Run:
npm run dev

Application:
http://localhost:3000

Production Build
Build:
npm run build
Start:
npm start
Main Features

Authentication

Includes:

* Login
* Register
* Profile fetching
* Password change
* Profile image upload
* Multiple accounts switching

⸻

Posts

Supports:

* Create posts
* Edit posts
* Delete posts
* Feed loading
* Likes
* Bookmarks
* Sharing

Current limitation:

Posts support one image only.

The current API contract uses:
image?: string
Multi-image posts require backend changes.

⸻

Comments

Supports:

* Comments
* Replies
* Likes
* Editing
* Deleting

⸻

Notifications

Supports:

* Notification list
* Read status
* Unread counter

⸻

Authentication Storage

PineUp uses:

Local Storage
Stores:
pineup_token
pineup_user

Cookie
Stores:
pineup_token

Used by:
middleware.ts
for route protection.

State Management Strategy

Server state:
React Query
Examples:

* Posts
* Users
* Notifications
* Profile

Client state:
React Context
Examples:

* Theme
* Socket provider
Code Standards

Imports:
Always prefer:
import { something } from "@/path"
instead of:
import { something } from "src/path"

Naming
Components:
PascalCase
Example:
PostCard.tsx

Hooks:
use-feature-name.ts
Example:
use-login.ts

Services:
feature.service.ts
Example:
posts.service.ts

Future Roadmap

Planned improvements:

* Infinite scrolling feed
* Optimistic updates
* Multi-image posts
* Better caching strategy
* Server-side authentication
* Real websocket notifications
* Advanced search
* Media optimization

⸻

Maintainers

PineUp Development Team
---

# 📄 docs/ARCHITECTURE.md

```md
# PineUp Architecture

---

# Overview

PineUp uses a modular architecture based on:

- Next.js App Router
- Feature-driven organization
- Service abstraction
- React Query data management

The goal is separation between:

UI

↓

Business Logic

↓

API Communication

↓

Backend

---

# High Level Architecture
Browser

↓

Next.js App Router

↓

Pages / Layouts

↓

Feature Components

↓

Custom Hooks

↓

Services

↓

Axios API Layer

↓

Backend API
---

# Folder Responsibilities


## app/

Responsible for:

- Routing
- Layouts
- Middleware integration
- Server components


Example:
app/(protected)/feed/page.tsx
Only handles page composition.

Business logic should stay inside features.


---

# src/features

Main application modules.

Each feature is isolated.

Example:
features/posts
Contains:
components
hooks
services
types
utils
---

# Components Layer

Location:
src/components
Contains reusable UI.

Examples:
Button
Modal
Avatar
Loader
Layout
Components here should not contain business logic.

---

# Services Layer

Location:
src/services
Responsible for:

- Axios instance
- API endpoints
- Network communication


Example:
authService.login()

postsService.getFeed()
---

# Hooks Layer

Custom hooks connect:

UI

↓

React Query

↓

Services


Example:
useFeed()

↓

postsService.getFeed()
---

# Data Flow Example

## Login
LoginForm

↓

useLogin()

↓

authService.login()

↓

Axios

↓

Backend

↓

Save Token

↓

Update Query Cache

↓

Redirect Feed
---

# Posts Flow
Feed Page

↓

FeedList

↓

useFeed()

↓

postsService.getFeed()

↓

API

↓

React Query Cache

↓

Render Posts
---

# Providers Architecture


Root providers:
ApiProvider

QueryProvider

ThemeProvider

ToastProvider

SocketProvider
Responsibilities:

## ApiProvider

Initializes Axios interceptors.


## QueryProvider

Provides React Query.


## ThemeProvider

Controls:

- Light mode
- Dark mode


## ToastProvider

Global notifications.


---

# Authentication Architecture


Authentication has two protection layers:


## Middleware

Server-side protection:
Cookie check

↓

Allow

or

Redirect login
## Client Guard

Client-side verification:
Token

↓

Profile

↓

Authenticated User
---

# Important Architecture Decisions


## Feature Isolation

Features own their logic.

Avoid:
global components with business logic
---

## API Separation

Components never call Axios directly.

Wrong:

```ts
api.get()
inside component.
Correct:
Component

↓

Hook

↓

Service

↓

API
Known Improvements

Axios Interceptors

Current architecture has interceptor initialization in:
axios.ts

and

ApiProvider
This should be unified to prevent duplicate interceptors.

Recommended:
axios.ts

only create instance


interceptors.ts

only setup interceptors
Authentication Security

Current:
localStorage + cookie
Future production improvement:
HttpOnly Secure Cookie
Conclusion

PineUp architecture is ready for scaling.

The current structure supports adding:

* New features
* More API modules
* Advanced caching
* Real-time functionality

without major restructuring.
````

# PineUp API Layer

## Overview

PineUp uses a centralized Axios-based API layer.

Architecture:
Feature Hook

↓

Service Layer

↓

Axios Instance

↓

Backend API
Components never communicate with the API directly.

---

# Axios Instance

Location:
src/services/api/axios.ts
Responsibilities:

- Create Axios instance
- Define base URL
- Configure timeout
- Provide shared HTTP client

Example:

````ts
axios.create({
 baseURL,
 timeout:15000
})
API Endpoints

Location:
src/services/api/endpoints.ts
All API routes are centralized.

Example:
API_ENDPOINTS.POSTS.FEED
Benefits:

* No duplicated strings
* Easier backend changes
* Better maintainability

⸻

Services

Each feature owns its API logic.

Example:
features/posts/services/posts.service.ts
Contains:

* Fetch posts
* Create post
* Update post
* Delete post
* Like
* Bookmark
* Share

⸻

Response Normalization

Backend responses are normalized before reaching UI.

Example:

Backend:
{
 data:{
   posts:[]
 }
}
Frontend receives:
{
 posts:[]
}
This keeps components independent from API structure.

⸻

Interceptors

Current flow:
Request

↓

Attach Token

↓

API

↓

Response
Token source:
localStorage
Key:
pineup_token

Important Improvement

Current project has interceptor initialization in two places:
axios.ts

+

ApiProvider
Recommended:
axios.ts

Create instance only


interceptors.ts

Setup interceptors once
File Uploads

Multipart requests are used for:

* Profile photo
* Post images

Example:
FormData
Current Media Limitation

Posts currently support:
image?: string
Only one image.

Multiple images require:
images?: string[]
and backend support.

⸻

API Rules

Never:
api.get()
inside components.

Correct:
Component

↓

Hook

↓

Service

↓

API
---

# 📄 docs/AUTH_FLOW.md

```md
# Authentication Flow

## Overview

PineUp authentication is based on:

- JWT Token
- Local Storage
- Cookie Session
- React Query Cache


---

# Login Flow
Login Form

↓

useLogin()

↓

authService.login()

↓

POST /users/signin

↓

Receive Token + User

↓

Save Session

↓

Update Cache

↓

Redirect Feed
---

# Storage

## Local Storage

Stores:
pineup_token
pineup_user
---

## Cookie

Stores:
pineup_token
Used by:
middleware.ts
for route protection.

---

# Auth Hook

Location:
features/auth/hooks/use-auth.ts
Responsibilities:

- Read token
- Fetch profile
- Handle unauthorized users
- Sync authentication state


---

# Authentication Events

The project uses:

```ts
window.dispatchEvent(
 new Event("auth-change")
)
to synchronize:

* Login
* Logout
* Account switching

⸻

Route Protection

Two layers:

Server Protection

Middleware:
Request

↓

Check Cookie

↓

Allow / Redirect
Client Protection

useAuthGuard:
Token

↓

Profile

↓

Authenticated User
Multiple Accounts

Supported through:
account-storage.ts
Stores:
token
+
user
Allows:

* Switch account
* Keep multiple sessions

⸻

Security Improvements

Future:

Replace:
localStorage JWT
with:
HttpOnly Secure Cookie
---

# 📄 docs/REACT_QUERY.md

```md
# React Query Strategy

## Overview

PineUp uses TanStack React Query for server state management.


Responsibilities:

- API caching
- Loading states
- Error handling
- Data synchronization


---

# Query Keys

Location:
src/constants/query-keys.ts
All cache keys are centralized.


Example:

```ts
queryKeys.posts.feed()
returns:
[
 "posts",
 "feed"
]
Queries

Used for reading data:

Examples:

* Feed
* Profile
* Notifications
* Bookmarks

Example:
useQuery({
 queryKey,
 queryFn
})
Mutations

Used for:

* Create post
* Like
* Bookmark
* Comment
* Follow

Flow:
Mutation

↓

API

↓

Invalidate Query

↓

Refresh UICache Strategy

Example:

Feed:
posts.feed()
Profile:
auth.profile()
Single Post:
posts.single(id)
Recommended Improvements

Optimistic Updates

Current:
Click Like

↓

API

↓

Update UI
Future:
Click Like

↓

Update UI instantly

↓

API

↓

Rollback if failed
Infinite Feed

Current:
useQuery
Future:
useInfiniteQuery
For social-media scale.
# PineUp Documentation Summary

## Features

Project modules:

- Auth
- Posts
- Comments
- Notifications
- Profiles
- Search
- Users
- Social


## Folder Rules

app/
→ Routing only

src/features/
→ Business logic

src/components/
→ Shared UI

src/services/
→ API communication

src/hooks/
→ React state logic


## Coding Rules

- Components do not call APIs directly.
- Every feature owns its hooks/services/types.
- Shared components stay in components/common.
- All routes stay centralized.
- All query keys stay centralized.


## Assets

Current location:

src/assets

Recommended:

Keep imported static assets here.

Example:

import logo from "@/assets/primarylogo.png"


Use public/ only for files accessed by URL:

/favicon.png


## Current Risks

1. JWT stored in localStorage.
Future:
Use HttpOnly cookies.

2. Axios interceptor duplicated.
Keep setup in one place.

3. Posts support one image only.
Backend change required for gallery.


## Production Checklist

✓ TypeScript strict mode
✓ Feature-based architecture
✓ React Query caching
✓ Protected routes
✓ Central API layer
✓ Shared UI system
✓ Environment variables

Next improvements:

- Infinite feed
- Optimistic updates
- Better error boundary
- Image optimization
- Backend multiple images
````
