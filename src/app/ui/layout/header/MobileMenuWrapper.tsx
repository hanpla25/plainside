// --- UI ---
import {
  CategoryLinkButton,
  ProfileLinkButton,
  SignInLinkButton,
  SignOutButton,
  SignUpLinkButton,
} from "./buttons";

function MenuItem({ children }: { children: React.ReactNode }) {
  return <li className="hover:bg-neutral-100 p-1 pl-2">{children}</li>;
}

function LoginMenuContent() {
  return (
    <>
      <MenuItem>
        <ProfileLinkButton />
      </MenuItem>

      <MenuItem>
        <SignOutButton />
      </MenuItem>
    </>
  );
}

function NonLoginContent() {
  return (
    <>
      <MenuItem>
        <SignInLinkButton />
      </MenuItem>

      <MenuItem>
        <SignUpLinkButton />
      </MenuItem>
    </>
  );
}

function MenuContent({ isLogin }: { isLogin: boolean }) {
  return (
    <>
      <MenuItem>
        <CategoryLinkButton />
      </MenuItem>

      {isLogin ? <LoginMenuContent /> : <NonLoginContent />}
    </>
  );
}

export default function MobileMenuWrapper({ isLogin }: { isLogin: boolean }) {
  return (
    <ul className="lg:hidden absolute bg-white z-50 p-2 w-[100vw] h-[calc(100vh-60px)] flex flex-col gap-6 top-[60px]">
      <MenuContent isLogin={isLogin} />
    </ul>
  );
}
