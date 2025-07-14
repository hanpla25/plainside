import { getUserFromToken } from "@/app/lib/data";
import AuthHeader from "@/app/ui/auth/Header";
import SignInForm from "@/app/ui/auth/SigninForm";

export default async function LoginPage() {
  const user = await getUserFromToken();

  return (
    <>
      <AuthHeader label="로그인" />
      <SignInForm />
    </>
  );
}
