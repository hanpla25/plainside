import { UserData } from "@/app/lib/definitions";

type Props = {
  userData: UserData | null;
};

export default function ProfileHeader({ userData }: Props) {
  return (
    <header className="flex items-center justify-center mb-4">
      <h1 className="text-xl font-semi-bold">{userData?.user_name}의 프로필</h1>
    </header>
  );
}
