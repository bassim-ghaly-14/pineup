export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/users/signup",
    SIGNIN: "/users/signin",
    CHANGE_PASSWORD: "/users/change-password",
    UPLOAD_PHOTO: "/users/upload-photo",
    PROFILE: "/users/profile-data",
  },

  USERS: {
    BOOKMARKS: "/users/bookmarks",
    SUGGESTIONS: "/users/suggestions",
    PROFILE: (userId: string) =>
      `/users/${userId}/profile`,
    FOLLOW: (userId: string) =>
      `/users/${userId}/follow`,
    POSTS: (userId: string) =>
      `/users/${userId}/posts`,
  },

  POSTS: {
    CREATE: "/posts",
    GET_ALL: "/posts",
    FEED: "/posts/feed",
    GET_SINGLE: (postId: string) =>
      `/posts/${postId}`,
    UPDATE: (postId: string) =>
      `/posts/${postId}`,
    DELETE: (postId: string) =>
      `/posts/${postId}`,
    LIKES: (postId: string) =>
      `/posts/${postId}/likes`,
    TOGGLE_LIKE: (postId: string) =>
      `/posts/${postId}/like`,
    TOGGLE_BOOKMARK: (postId: string) =>
      `/posts/${postId}/bookmark`,
    SHARE: (postId: string) =>
      `/posts/${postId}/share`,
  },

  COMMENTS: {
    LIST: (postId: string) =>
      `/posts/${postId}/comments`,
    CREATE: (postId: string) =>
      `/posts/${postId}/comments`,
    UPDATE: (
      postId: string,
      commentId: string
    ) =>
      `/posts/${postId}/comments/${commentId}`,
    DELETE: (
      postId: string,
      commentId: string
    ) =>
      `/posts/${postId}/comments/${commentId}`,
    TOGGLE_LIKE: (
      postId: string,
      commentId: string
    ) =>
      `/posts/${postId}/comments/${commentId}/like`,
    REPLIES: (
      postId: string,
      commentId: string
    ) =>
      `/posts/${postId}/comments/${commentId}/replies`,
    CREATE_REPLY: (
      postId: string,
      commentId: string
    ) =>
      `/posts/${postId}/comments/${commentId}/replies`,
  },

  NOTIFICATIONS: {
    GET_ALL: "/notifications",
    UNREAD_COUNT: "/notifications/unread-count",
    MARK_AS_READ: (notificationId: string) => `/notifications/${notificationId}/read`,
    MARK_ALL_AS_READ: "/notifications/read-all",
  },
} as const;