"use client";

import { useSearchParams } from "next/navigation";
import AuthInput from "./AuthInput";
import { SubmitButton } from "./buttons";

export default function SignInForm() {
  const searchParams = useSearchParams();

  return (
    <form className="space-y-4">
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

      <SubmitButton label="로그인" isPending={false} />
    </form>
  );
}
