export const analytics = {
  track(
    event: string,
    payload?: unknown
  ) {
    if (
      process.env.NODE_ENV !==
      "production"
    ) {
      console.log(
        "[analytics]",
        event,
        payload
      );
    }
  },
};