export default function formatDate(
  dateString: string,
  type: "time" | "YMD" | "relative" | "YMDT"
): string {
  const date = new Date(dateString);
  const now = new Date();
  const formatDatePart = (d: Date) =>
    d
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\.$/, "");

  if (type === "relative") {
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return "방금 전";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    return `${Math.floor(diffSec / 86400)}일 전`;
  }

  const isToday = date.toDateString() === now.toDateString();

  return type === "time"
    ? isToday
      ? date.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : formatDatePart(date).slice(5)
    : type === "YMD"
    ? formatDatePart(date)
    : `${formatDatePart(date)} ${date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`;
}
