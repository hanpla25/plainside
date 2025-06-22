import { UserData, UserPayload } from "@/app/lib/definition";
import Profile from "./profile";
import NeedLogin from "./need-login";

type Props = {
  userData: UserData | null;
};

export default function ProfileBox({ userData }: Props) {
  return (
    <div className="w-full">
      {userData ? <Profile userData={userData} /> : <NeedLogin />}
    </div>
  );
}
