"use client";

import { CircleAlert } from "lucide-react";
import AuthInput from "./AuthInput";
import { SubmitButton } from "./buttons";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/app/lib/actions/auth-actions";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [errorMsg, formAction, isPending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="space-y-4 mt-4 mx-2 lg:mx-0">
      <AuthInput
        type="text"
        label="아이디"
        id="id"
        name="id"
        placeholder="아이디를 입력해주세요"
        minLength={4}
        required
      />

      <AuthInput
        label="비밀번호"
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        minLength={4}
        required
      />

      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {errorMsg && (
        <div className="flex items-center">
          <CircleAlert color="#ff0000" size={14} className="mr-2" />
          <p className="text-sm text-red-500">{errorMsg}</p>
        </div>
      )}

      <SubmitButton label={"로그인"} isPending={isPending} />
    </form>
  );
}
