import clsx from "clsx";
import MobileWrapperItems from "./mobile-wrapper-items";

type Props = {
  openWrapper: boolean;
};

const isLogin = false;

export default function MobileWrapper({ openWrapper }: Props) {
  const menuItems = isLogin
    ? [{ href: "/profile", label: "프로필" }]
    : [
        { href: "/login", label: "로그인" },
        { href: "/signup", label: "회원가입" },
      ];

  return (
    <div
      className={clsx(
        "absolute bg-white z-50 p-4 w-[100vw] h-[100vh]",
        !openWrapper && "hidden"
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
