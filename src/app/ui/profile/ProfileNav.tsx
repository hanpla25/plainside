import Link from "next/link";

type Props = {
  currentMenu: string;
};

const navItem = [
  { value: "home", label: "홈", href: "/profile" },
  { value: "posts", label: "게시글", href: "/profile?menu=posts" },
  { value: "comments", label: "댓글", href: "/profile?menu=comments" },
] as const;

export default function ProfileNav({ currentMenu }: Props) {
  return (
    <ul className="flex bg-neutral-600">
      {navItem.map((item) => (
        <li key={item.label} className="flex-1">
          <Link
            href={item.href}
            className={`block w-full h-full text-center py-2 cursor-pointer ${
              currentMenu === item.value ? "text-white" : "text-neutral-300"
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
