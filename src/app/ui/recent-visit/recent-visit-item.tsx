import Link from "next/link";

export default function RecentVisitItem({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  return (
    <Link
      href={href}
      className="border border-neutral-900 rounded-md p-1 text-sm mb-1"
    >
      {name}
    </Link>
  );
}
