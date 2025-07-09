import { UserData, UserPayload } from "@/app/lib/definitions";

type Props = {
  user: UserPayload;
};

export default function ProfileHeader({ user }: Props) {
  return (
    <header className="flex items-center justify-center mb-4">
      <h1 className="text-xl font-semi-bold">{user.user_name}의 프로필</h1>
    </header>
  );
}
