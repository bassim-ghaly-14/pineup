export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FEED: "/feed",
  PROFILE: "/profile",
  PROFILE_BY_ID:(id: string) =>  `/profile/${id}`,
  POST:(id: string) =>  `/posts/${id}`,
  BOOKMARKS: "/bookmarks",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",
} as const;