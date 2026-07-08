"use client";

import { useMutation } from "@tanstack/react-query";

import { postsService } from "../services/posts.service";

export function useSharePost() {
  return useMutation({
    mutationFn: postsService.share,
  });
}