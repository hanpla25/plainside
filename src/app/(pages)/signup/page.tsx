import SignupForm from "@/app/ui/singup/singup-form";

export default function SignPage() {
  return (
    <div className="p-10 lg:p-2">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <SignupForm />
    </div>
  );
}
