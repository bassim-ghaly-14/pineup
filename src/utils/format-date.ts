export function formatDate(
  date?: string | Date
) {
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

export function formatJoinedDate(
  date?: string | Date
) {
  if (!date) return "";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function formatRelativeDate(
  date?: string | Date
) {
  if (!date) return "Just now";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return "Just now";
  }

  const seconds = Math.floor(
    (Date.now() - parsed.getTime()) / 1000
  );

  const intervals = [
    {
      label: "year",
      seconds: 31536000,
    },
    {
      label: "month",
      seconds: 2592000,
    },
    {
      label: "day",
      seconds: 86400,
    },
    {
      label: "hour",
      seconds: 3600,
    },
    {
      label: "minute",
      seconds: 60,
    },
    {
      label: "second",
      seconds: 1,
    },
  ];

  for (const interval of intervals) {
    const value = Math.floor(
      seconds / interval.seconds
    );

    if (value >= 1) {
      return `${value} ${interval.label}${
        value > 1 ? "s" : ""
      } ago`;
    }
  }

  return "Just now";
}