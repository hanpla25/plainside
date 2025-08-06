// --- Utils ---
import formatDate from "@/app/utils/format-date";

export default function PostTitle({
  title,
  createdAt,
}: {
  title: string;
  createdAt: string;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-y border-neutral-400">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-sm text-neutral-600">
        {formatDate(createdAt, "YMDT")}
      </span>
    </div>
  );
}
