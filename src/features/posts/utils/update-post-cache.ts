import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "src/constants/query-keys";

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
  let ownerId = userId;


  const singlePost =
    queryClient.getQueryData<Post>(
      queryKeys.posts.single(postId)
    );


  if (!ownerId && singlePost?.user?._id) {
    ownerId = singlePost.user._id;
  }



  const feedPost =
    queryClient
      .getQueryData<FeedResponse>(
        queryKeys.posts.feed()
      )
      ?.posts.find(
        (post) =>
          post._id === postId
      );


  if (!ownerId && feedPost?.user?._id) {
    ownerId = feedPost.user._id;
  }



  queryClient.setQueryData<Post>(
    queryKeys.posts.single(postId),
    (old) =>
      old
        ? updater(old)
        : old
  );


const feed =
  queryClient.getQueryData<FeedResponse>(
    queryKeys.posts.feed()
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

queryClient.setQueryData(
  queryKeys.posts.explore(),
  (old: any) => {
    if (!old?.pages) return old;

    return {
      ...old,
      pages: old.pages.map((page: any) => ({
        ...page,
        posts: updatePosts(
          page.posts,
          postId,
          updater
        ),
      })),
      posts: updatePosts(
        old.posts ?? [],
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



  if (ownerId) {

    queryClient.setQueryData<Post[]>(
      queryKeys.users.posts(ownerId),
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
queryClient.setQueryData(
  queryKeys.posts.explore(),
  (old: any) => {
    if (!old?.pages?.length) return old;

    return {
      ...old,
      pages: [
        {
          ...old.pages[0],
          posts: [post, ...old.pages[0].posts],
        },
        ...old.pages.slice(1),
      ],
      posts: [post, ...(old.posts ?? [])],
    };
  }
);
  if (post.user?._id) {
  queryClient.setQueryData<Post[]>(
    queryKeys.users.posts(post.user._id),
    (old) => {
      if (!old) return old;

      return [post, ...old];
    }
  );
}
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
queryClient.setQueryData(
  queryKeys.posts.explore(),
  (old: any) => {
    if (!old?.pages) return old;

    return {
      ...old,
      pages: old.pages.map((page: any) => ({
        ...page,
        posts: removePosts(
          page.posts,
          postId
        ),
      })),
      posts: removePosts(
        old.posts ?? [],
        postId
      ),
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