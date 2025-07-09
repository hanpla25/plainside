import {
  CateogryButton,
  LoginButton,
  LogOutButton,
  MobileMenuButton,
  ProfileButton,
  SearchButton,
  SignupButton,
} from "./buttons";

type Props = {
  isLogin: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderButtons({
  isLogin,
  setIsSearchOpen,
  isMenuOpen,
  setIsMenuOpen,
}: Props) {
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <SearchButton onClick={() => setIsSearchOpen((prev) => !prev)} />
      <CateogryButton />

      {isLogin ? (
        <>
          <ProfileButton />
          <LogOutButton />
        </>
      ) : (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
      <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
