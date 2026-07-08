export function normalizeArray<T>(
  value: unknown
): T[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
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