import { fetchUserData, getUserFromToken } from "@/app/lib/data/data";
import CategoryForm from "@/app/ui/category/CategoryForm";
import HeaderText from "@/app/ui/common/HeaderText";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUserFromToken();

  if (!user) redirect("/signin?callbackUrl=/category");

  return (
    <>
      <HeaderText label={"전체 갤러리"} href={"/category"} />
      <CategoryForm />
    </>
  );
}
