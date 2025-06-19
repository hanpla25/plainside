export function formatDateTime(
  dateInput: string,
  type: "time" | "full" | "monthTime"
): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const pad = (n: number) => String(n).padStart(2, "0");

  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  const dayMonth = `${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
  const full = `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )} ${time}`;

  if (type === "time") {
    return isToday ? time : dayMonth;
  }

  if (type === "monthTime") {
    return `${dayMonth} ${time}`;
  }

  if (type === "full") return full;

  return full;
}
