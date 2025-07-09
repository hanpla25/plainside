import { getUserData, getUserFromToken } from "@/app/lib/data";
import ProfileHeader from "@/app/ui/profile/ProfileHeader";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login");
  }

  const userData = await getUserData(user);

  return (
    <div>
      <ProfileHeader userData={userData} />
      {children}
    </div>
  );
}
