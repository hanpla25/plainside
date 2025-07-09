import { getUserFromToken } from "@/app/lib/data";
import Profile from "@/app/ui/profile";
import ProfileHeader from "@/app/ui/profile/ProfileHeader";
import ProfileNav from "@/app/ui/profile/ProfileNav";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProfilePage(props: {
  searchParams: SearchParams;
}) {
  const user = await getUserFromToken();

  const searchParams = await props.searchParams;
  const menuParam = searchParams.menu;
  const currentMenu =
    menuParam === "posts" || menuParam === "comments" ? menuParam : "home";

  const page = Number(searchParams.page || 1);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mb-50">
      <ProfileHeader user={user} />
      <ProfileNav currentMenu={currentMenu} />
      <Profile user={user} currentMenu={currentMenu} page={page} />
    </div>
  );
}
