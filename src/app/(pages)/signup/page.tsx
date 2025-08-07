import SignupForm from "@/app/ui/auth/SignupForm";

export default function SignupPage() {
  return (
    <>
      <h1 className="lg:px-0 px-2 py-2">
        <span className="font bold text-xl">회원가입</span>
      </h1>
      <SignupForm />
    </>
  );
}
