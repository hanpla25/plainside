import { getUserFromToken } from "@/app/lib/data/data";
import SignUpForm from "@/app/ui/auth/SignUpForm";
import HeaderText from "@/app/ui/common/HeaderText";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getUserFromToken();

  if (user) redirect("/");

  return (
    <>
      <HeaderText label={"회원가입"} href={"#"} />
      <SignUpForm />
    </>
  );
}
