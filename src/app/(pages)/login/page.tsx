import { getUserFromToken } from "@/app/lib/data";
import AuthHeader from "@/app/ui/auth/header";
import LoginForm from "@/app/ui/auth/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUserFromToken();
  const isLogin = !!user;

  if (isLogin) redirect("/");

  return (
    <div>
      <AuthHeader label="로그인" />
      <LoginForm />
    </div>
  );
}
