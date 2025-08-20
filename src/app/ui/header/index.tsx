// --- UI ---
import Logo from "./Logo";
import HeaderRightButtons from "./HeaderRightButtons";

type Props = {
  isLogin: boolean;
};

export default function Header({ isLogin }: Props) {
  return (
    <div className="p-2 lg:px-0 flex items-center justify-between">
      <Logo />
      <HeaderRightButtons isLogin={isLogin} />
    </div>
  );
}
