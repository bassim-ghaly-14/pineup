export function debounce<T>(
  callback: (
    value: T
  ) => void,

  delay = 300
) {
  let timeout:
    | NodeJS.Timeout
    | null = null;

  return (value: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(
      () =>
        callback(value),
      delay
    );
  };
}