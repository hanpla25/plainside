import { UserPayload } from "@/app/lib/definition";
import MobileWrapperItem from "./menu-item";

export default function Menu({ user }: { user: UserPayload | null }) {
  const menuItems = [
    { href: "/category", label: "전체갤러리" },
    ...(user
      ? [
          { href: "/profile", label: "프로필" },
          { href: "#", label: "로그아웃", isLogout: true },
        ]
      : [
          { href: "/login", label: "로그인" },
          { href: "/signup", label: "회원가입" },
        ]),
  ];

  return (
    <div className="absolute bg-white z-50 p-4 w-[100vw] h-[100vh] lg:hidden">
      <ul>
        {menuItems.map((item, i) => (
          <MobileWrapperItem
            key={i}
            href={item.href}
            label={item.label}
            isLogout={item.isLogout}
          />
        ))}
      </ul>
    </div>
  );
}
