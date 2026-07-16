export function normalizeObject<T>(
  value: unknown
): T {
  if (!value) {
    return {} as T;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof (value as any).data === "object"
  ) {
    return (value as any).data as T;
  }

  return value as T;
}