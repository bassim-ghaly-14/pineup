"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/constants/query-keys";
import { postsService } from "../services/posts.service";

export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.posts.single(id),
    queryFn: () => postsService.getById(id),
    enabled: !!id,
  });
}