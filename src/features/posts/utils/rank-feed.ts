import { Post } from "../types/post.types";

export function rankFeed(
  posts: Post[]
) {
  return [...posts].sort(
    (a, b) => {
      const scoreA =
        (a.likes?.length ??
          0) +
        (a.commentsCount ??
          0);

      const scoreB =
        (b.likes?.length ??
          0) +
        (b.commentsCount ??
          0);

      return (
        scoreB - scoreA
      );
    }
  );
}