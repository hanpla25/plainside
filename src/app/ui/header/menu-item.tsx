import Link from "next/link";
import { logout } from "@/app/lib/actions";

type Props = {
  href: string;
  label: string;
  isLogout?: boolean;
};

export default function MobileWrapperItem({ href, label, isLogout }: Props) {
  if (isLogout) {
    return (
      <li className="p-2">
        <form action={logout}>
          <button
            type="submit"
            className="block w-full text-left px-2 py-1  active:bg-neutral-200 transition"
          >
            {label}
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="p-2">
      <Link
        href={href}
        className="block w-full px-2 py-1  active:bg-neutral-200 transition"
      >
        {label}
      </Link>
    </li>
  );
}
