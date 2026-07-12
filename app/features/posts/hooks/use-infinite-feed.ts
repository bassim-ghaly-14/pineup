"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { postsService } from "../services/posts.service";
import { queryKeys } from "@/constants/query-keys";

export function useInfiniteFeed() {
  return useInfiniteQuery({
    queryKey: queryKeys.posts.explore(),

    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }) =>
      postsService.getFeed({
        page: pageParam,
        limit: 10,
        only: "all"
      }),

    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;

      const { page, pages } = lastPage;

      return page < pages ? page + 1 : undefined;
    },

    select: (data) => {
      return {
        ...data,
        posts: data.pages.flatMap((p) => p.posts ?? []),
      };
    },
  });
}