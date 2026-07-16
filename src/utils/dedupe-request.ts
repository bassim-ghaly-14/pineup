const pending =
  new Map<
    string,
    Promise<unknown>
  >();

export async function dedupeRequest<T>(
  key: string,

  fn: () => Promise<T>
): Promise<T> {
  if (pending.has(key)) {
    return pending.get(
      key
    ) as Promise<T>;
  }

  const promise = fn().finally(
    () => pending.delete(key)
  );

  pending.set(key, promise);

  return promise;
}