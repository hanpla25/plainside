import clsx from "clsx";
import MobileWrapperItems from "./mobile-menu-items";

type Props = {
  openMenu: boolean;
};

const isLogin = true;

export default function MobileWrapper({ openMenu }: Props) {
  const menuItems = [
    ...(isLogin
      ? [{ href: "/profile", label: "프로필" }]
      : [
          { href: "/login", label: "로그인" },
          { href: "/signup", label: "회원가입" },
        ]),
    { href: "/category", label: "전체갤러리" },
  ];

  return (
    <div
      className={clsx(
        "absolute bg-white z-50 p-4 w-[100vw] h-[100vh]",
        !openMenu && "hidden"
      )}
    >
      <ul>
        {menuItems.map((item, i) => (
          <MobileWrapperItems href={item.href} label={item.label} key={i} />
        ))}
      </ul>
    </div>
  );
}
