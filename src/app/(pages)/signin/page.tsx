import SigninForm from "@/app/ui/auth/SigninForm";

export default function SignInPage() {
  return (
    <>
      <h1 className="lg:px-0 px-2 py-2">
        <span className="font bold text-xl">로그인</span>
      </h1>
      <SigninForm />
    </>
  );
}
