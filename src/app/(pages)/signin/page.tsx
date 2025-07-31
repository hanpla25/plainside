import { getUserFromToken } from "@/app/lib/data/data";
import SignInForm from "@/app/ui/auth/SigninForm";
import HeaderText from "@/app/ui/common/HeaderText";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getUserFromToken();

  if (user) redirect("/");

  return (
    <>
      <HeaderText label={"로그인"} href={"#"} />
      <SignInForm />
    </>
  );
}
