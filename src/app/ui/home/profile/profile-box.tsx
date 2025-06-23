import { UserData, UserPayload } from "@/app/lib/definition";
import Profile from "./profile";
import NeedLogin from "./need-login";

type Props = {
  userData: UserData | null;
};

export default function ProfileBox({ userData }: Props) {
  return (
    <div className="w-full border border-neutral-400 p-2">
      {userData ? <Profile userData={userData} /> : <NeedLogin />}
    </div>
  );
}
