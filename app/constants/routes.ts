export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FEED: "/feed",
  PROFILE: "/profile",
  PROFILE_BY_ID: (id: string) => `/profile/${id}`,
  PROFILE_FOLLOWERS: (id: string) => `/profile/${id}/followers`,
  PROFILE_FOLLOWING: (id: string) => `/profile/${id}/following`,
  POST: (id: string) => `/posts/${id}`,
  BOOKMARKS: "/bookmarks",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",
  SUGGESTIONS: "/suggestions",
} as const;