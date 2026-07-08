import { Skeleton } from "@mui/material";

export function PostSkeleton() {
  return (
    <>
      <Skeleton height={60} />
      <Skeleton height={200} />
      <Skeleton height={40} />
    </>
  );
}