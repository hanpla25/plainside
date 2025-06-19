import MobileWrapperItem from "./menu-item";

const isLogin = false;

const menuItems = [
  ...(isLogin
    ? [{ href: "/profile", label: "프로필" }]
    : [
        { href: "/login", label: "로그인" },
        { href: "/signup", label: "회원가입" },
      ]),
  { href: "/category", label: "전체갤러리" },
];

export default function Menu() {
  return (
    <div className="absolute bg-white z-50 p-4 w-[100vw] h-[100vh] lg:hidden">
      <ul>
        {menuItems.map((item, i) => (
          <MobileWrapperItem href={item.href} label={item.label} key={i} />
        ))}
      </ul>
    </div>
  );
}
