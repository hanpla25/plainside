export function formatDateTime(
  dateInput: string,
  type: "time" | "full" | "monthTime" | "relative"
): string {
  const date = new Date(dateInput);
  const now = new Date();

  const pad = (n: number) => String(n).padStart(2, "0");

  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  const dayMonth = `${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
  const full = `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )} ${time}`;

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (type === "time") {
    return isToday ? time : dayMonth;
  }

  if (type === "monthTime") {
    return `${dayMonth} ${time}`;
  }

  if (type === "full") return full;

  if (type === "relative") {
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    return `${diffDay}일 전`;
  }

  return full;
}
