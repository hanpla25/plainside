import Link from "next/link";
import { logout } from "@/app/lib/actions";

type Props = {
  href: string;
  label: string;
  isLogout?: boolean;
};

export default function MobileWrapperItem({ href, label, isLogout }: Props) {
  return (
    <li className="p-2">
      {isLogout ? (
        <form action={logout}>
          <button type="submit" className="text-left w-full">
            {label}
          </button>
        </form>
      ) : (
        <Link href={href}>{label}</Link>
      )}
    </li>
  );
}
