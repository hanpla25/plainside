import { UserPayload } from "@/app/lib/definitions";
import NeedLogin from "./NeedLogin";
import { getUserData } from "@/app/lib/data";
import ProfileBox from "./ProfileBox";

type Props = {
  user: UserPayload | null;
};

export default async function LoginBox({ user }: Props) {
  if (!user) return <NeedLogin />;

  const userData = await getUserData(user);

  return (
    <>
      <ProfileBox userData={userData} />
    </>
  );
}
