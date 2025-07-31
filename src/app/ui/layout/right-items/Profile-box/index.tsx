import { UserPayload } from "@/app/lib/definitions";
import NeedLoginBox from "./NeedLoginBox";
import ProfileBox from "./ProfileBox";
import { fetchUserData } from "@/app/lib/data/data";

type Props = {
  user: UserPayload | null;
};

export default async function Profile({ user }: Props) {
  if (!user) return <NeedLoginBox />;

  const userData = await fetchUserData(user);

  console.log(userData);

  return (
    <>
      <ProfileBox userData={userData} />
    </>
  );
}
