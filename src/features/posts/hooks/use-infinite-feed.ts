"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { postsService } from "../services/posts.service";
import { queryKeys } from "src/constants/query-keys";
import { STORAGE_KEYS } from "src/constants/storage-keys";

export function useInfiniteFeed() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.TOKEN)
      : null;
  return useInfiniteQuery({
    queryKey: queryKeys.posts.explore(),
    initialPageParam: 1,
    enabled: !!token,
    queryFn: ({ pageParam }) =>
      postsService.getFeed({
        page: pageParam,
        limit: 10,
        only: "all",
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { page, pages } = lastPage;
      return page < pages ? page + 1 : undefined;
    },
    select: (data) => ({
      ...data,
      posts: data.pages.flatMap(
        (page) => page.posts ?? []
      ),
    }),
  });
}