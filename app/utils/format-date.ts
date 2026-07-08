export function formatDate(date?: string | Date) {
  if (!date) return "Just now";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}