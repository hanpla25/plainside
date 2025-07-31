import {
  CategoryLinkButton,
  LoginLinkButton,
  LogOutButton,
  MobileMenuButton,
  ProfileLinkButton,
  SearchButton,
  SignupLinkButton,
} from "./buttons";

type Props = {
  isLogin: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RightButtons({
  isLogin,
  isMenuOpen,
  setIsMenuOpen,
  setIsSearchOpen,
}: Props) {
  return (
    <>
      {/* 모바일 영역 */}
      <div className="lg:hidden flex items-center gap-3">
        <SearchButton onClick={() => setIsSearchOpen((prev) => !prev)} />
        {!isLogin ? <LoginLinkButton /> : <ProfileLinkButton />}
        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </div>

      {/* 데스크탑 영역 */}
      <div className="hidden lg:flex items-center gap-3">
        <SearchButton onClick={() => setIsSearchOpen((prev) => !prev)} />
        <CategoryLinkButton />
        {!isLogin ? (
          <>
            <LoginLinkButton />
            <SignupLinkButton />
          </>
        ) : (
          <>
            <ProfileLinkButton />
            <LogOutButton />
          </>
        )}
      </div>
    </>
  );
}
