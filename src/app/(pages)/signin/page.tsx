import { getUserFromToken } from "@/app/lib/data";
import AuthHeader from "@/app/ui/auth/Header";
import SignInForm from "@/app/ui/auth/SigninForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUserFromToken();

  if (user) redirect("/");

  return (
    <>
      <AuthHeader label="로그인" />
      <SignInForm />
    </>
  );
}
