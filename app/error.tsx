"use client";

import { ErrorState } from "@/components/common/error-state";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <ErrorState
      message={error.message}
    />
  );
}