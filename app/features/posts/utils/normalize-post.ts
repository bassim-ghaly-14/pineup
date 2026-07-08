import { Post } from "../types/post.types";

export function normalizePosts(
  value: unknown
): Post[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value as Post[];
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    Array.isArray((value as any).data)
  ) {
    return (value as any).data;
  }

  return [];
}