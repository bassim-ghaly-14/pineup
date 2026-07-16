export const cacheStrategy = {
  auth: {
    staleTime:
      1000 * 60 * 5,
  },

  profile: {
    staleTime:
      1000 * 60 * 5,
  },

  feed: {
    staleTime: 0,
  },

  notifications: {
    staleTime: 0,

    refetchInterval:
      30000,
  },
};