export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    profile: () => ["auth", "profile"] as const,
  },

  posts: {
    all: ["posts"] as const,
    feed: () => ["posts", "feed"] as const,
    list: () => ["posts", "list"] as const,
    single: (id: string) =>
      ["posts", "single", id] as const,
  },

  comments: {
    all: ["comments"] as const,

    post: (postId: string) =>
      ["comments", postId] as const,

    replies: (
      postId: string,
      commentId: string
    ) =>
      [
        "comments",
        postId,
        commentId,
        "replies",
      ] as const,
  },

  users: {
    all: ["users"] as const,
    profile: (id: string) =>
      ["users", "profile", id] as const,
    posts: (id: string) =>
      ["users", "posts", id] as const,
    suggestions: () =>
      ["users", "suggestions"] as const,
    bookmarks: () =>
      ["users", "bookmarks"] as const,
  },

  notifications: {
    all: ["notifications"] as const,
    list: () =>
      ["notifications", "list"] as const,
    unread: () =>
      ["notifications", "unread"] as const,
  },
} as const;