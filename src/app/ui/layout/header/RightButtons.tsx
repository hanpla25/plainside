// --- UI ---
import {
  CategoryLinkButton,
  MobileMenuButton,
  ProfileLinkButton,
  SearchButton,
  SignInLinkButton,
  SignOutButton,
  SignUpLinkButton,
} from "./buttons";

type Props = {
  isLogin: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

export default function RightButtons({
  isLogin,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onClick,
}: Props) {
  return (
    <>
      <DesktopButtons isLogin={isLogin} onClick={onClick} />
      <MobileButtons
        isLogin={isLogin}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onClick={onClick}
      />
    </>
  );
}

function DesktopButtons({
  isLogin,
  onClick,
}: {
  isLogin: boolean;
  onClick: () => void;
}) {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <SearchButton onClick={onClick} />
      <CategoryLinkButton />
      {isLogin ? (
        <>
          <ProfileLinkButton />
          <SignOutButton />
        </>
      ) : (
        <>
          <SignInLinkButton />
          <SignUpLinkButton />
        </>
      )}
    </div>
  );
}

function MobileButtons({
  isLogin,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onClick,
}: {
  isLogin: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}) {
  return (
    <div className="lg:hidden flex items-center gap-4">
      <SearchButton onClick={onClick} />
      {isLogin ? <ProfileLinkButton /> : <SignInLinkButton />}
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      />
    </div>
  );
}
