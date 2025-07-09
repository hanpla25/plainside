import { getUserData } from "@/app/lib/data";
import { UserPayload } from "@/app/lib/definitions";
import NeedLogin from "./NeedLogin";
import ProfileBox from "./ProfileBox";

type Props = {
  user: UserPayload | null;
  isLogin: boolean;
};

export default async function LoginBox({ user, isLogin }: Props) {
  if (!isLogin || !user) return <NeedLogin />;

  const userData = await getUserData(user);
  if (!userData) return null;

  return <ProfileBox userData={userData} />;
}
