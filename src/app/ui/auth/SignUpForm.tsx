"use client";

import { useActionState } from "react";
import AuthInput from "./AuthInput";
import { SubmitButton } from "./buttons";
import { CircleAlert } from "lucide-react";
import { signUp } from "@/app/lib/actions/auth-actions";

export default function SignUpForm() {
  const [errorMsg, formAction, isPending] = useActionState(signUp, null);

  return (
    <form action={formAction} className="space-y-4 mt-4 mx-2 lg:mx-0">
      <AuthInput
        type="text"
        label="이름"
        id="name"
        name="name"
        placeholder="이름을 입력해주세요"
        minLength={2}
        required
        defaultValue={errorMsg?.inputs?.name}
        errorMsg={errorMsg?.errors?.name}
      />
      {errorMsg?.errors?.name && (
        <div className="flex items-center">
          <CircleAlert color="#ff0000" size={14} className="mr-2" />
          <p className="text-sm text-red-500">{errorMsg.errors?.name}</p>
        </div>
      )}

      <AuthInput
        type="text"
        label="아이디"
        id="id"
        name="id"
        placeholder="아이디를 입력해주세요"
        minLength={4}
        required
        defaultValue={errorMsg?.inputs?.id}
        errorMsg={errorMsg?.errors?.id}
      />
      {errorMsg?.errors?.id && (
        <div className="flex items-center">
          <CircleAlert color="#ff0000" size={14} className="mr-2" />
          <p className="text-sm text-red-500">{errorMsg.errors?.id}</p>
        </div>
      )}

      <AuthInput
        label="비밀번호"
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        minLength={4}
        required
        defaultValue={errorMsg?.inputs?.password}
      />
      {errorMsg?.errors?.password && (
        <div className="flex items-center">
          <CircleAlert color="#ff0000" size={14} className="mr-2" />
          <p className="text-sm text-red-500">{errorMsg.errors?.password}</p>
        </div>
      )}

      <SubmitButton label={"회원가입"} isPending={isPending} />
    </form>
  );
}
