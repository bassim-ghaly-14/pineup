import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import type { Post } from "../types/post.types";


type Updater = (post: Post) => Post;


type FeedResponse = {
  posts: Post[];
  page: number;
  pages: number;
  total: number;
};


function isFeedResponse(
  data: unknown
): data is FeedResponse {
  return (
    !!data &&
    typeof data === "object" &&
    "posts" in data
  );
}



function updatePosts(
  posts: Post[],
  postId: string,
  updater: Updater
) {
  return posts.map((post) =>
    post._id === postId
      ? updater(post)
      : post
  );
}



function removePosts(
  posts: Post[],
  postId: string
) {
  return posts.filter(
    (post) =>
      post._id !== postId
  );
}



/**
 * Update post everywhere
 */
export function updatePostInCache(
  queryClient: QueryClient,
  postId: string,
  updater: Updater,
  userId?: string
) {


  queryClient.setQueryData<Post>(
    queryKeys.posts.single(postId),
    (old) =>
      old
        ? updater(old)
        : old
  );



  queryClient.setQueryData<FeedResponse>(
    queryKeys.posts.feed(),
    (old) => {

      if (!old) return old;


      if (!isFeedResponse(old)) {
        return old;
      }


      return {
        ...old,

        posts:
          updatePosts(
            old.posts,
            postId,
            updater
          ),
      };
    }
  );



  queryClient.setQueryData<Post[]>(
    queryKeys.users.bookmarks(),
    (old) =>
      old
        ? updatePosts(
            old,
            postId,
            updater
          )
        : old
  );



  if (userId) {

    queryClient.setQueryData<Post[]>(
      queryKeys.users.posts(userId),
      (old) =>
        old
          ? updatePosts(
              old,
              postId,
              updater
            )
          : old
    );
  }
}




/**
 * Add created/shared post
 */
export function addPostToCache(
  queryClient: QueryClient,
  post: Post
) {

  queryClient.setQueryData<FeedResponse>(
    queryKeys.posts.feed(),
    (old) => {

      if (!old) return old;


      if (!isFeedResponse(old)) {
        return old;
      }


      return {
        ...old,

        posts: [
          post,
          ...old.posts,
        ],

        total:
          old.total + 1,
      };
    }
  );
}

/**
 * Remove deleted post
 */
export function removePostFromCache(
  queryClient: QueryClient,
  postId: string
) {
  queryClient.removeQueries({
    queryKey: queryKeys.posts.single(postId),
  });

  queryClient.setQueryData<FeedResponse>(
    queryKeys.posts.feed(),
    (old) => {
      if (!old || !isFeedResponse(old)) return old;

      return {
        ...old,
        posts: old.posts.filter(
          (post) => post._id !== postId
        ),
        total: Math.max(0, old.total - 1),
      };
    }
  );

  queryClient.setQueryData<Post[]>(
    queryKeys.users.bookmarks(),
    (old) =>
      old
        ? old.filter(
            (post) => post._id !== postId
          )
        : old
  );

  // Update every cached user posts query
  queryClient
    .getQueryCache()
    .findAll({
      queryKey: ["users", "posts"],
    })
    .forEach((query) => {
      queryClient.setQueryData<Post[]>(
        query.queryKey,
        (old) =>
          old
            ? old.filter(
                (post) =>
                  post._id !== postId
              )
            : old
      );
    });
}