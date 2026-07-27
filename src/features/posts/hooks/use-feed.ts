"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/query-keys";
import { postsService } from "../services/posts.service";

export function useFeed() {
  return useQuery({
    queryKey: queryKeys.posts.feed(),
    queryFn: () => postsService.getFeed(),
    select: (data) => data.posts ?? [],
  });
}