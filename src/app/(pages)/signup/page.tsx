import { getUserFromToken } from "@/app/lib/data";
import AuthHeader from "@/app/ui/auth/header";
import SignupForm from "@/app/ui/auth/SignupForm";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const user = await getUserFromToken();
  const isLogin = !!user;

  if (isLogin) redirect("/");

  return (
    <div>
      <AuthHeader label="회원가입" />
      <SignupForm />
    </div>
  );
}
