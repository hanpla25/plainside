"use client";

import { useActionState } from "react";

// --- Actions ---
import { signup } from "@/app/lib/actions/auth-actions";

// --- UI ---
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthMsg from "./AuthMsg";

export default function SignupForm() {
  const [msg, formAction, isPending] = useActionState(signup, null);

  return (
    <form
      action={formAction}
      className="lg:px-0 max-w-lg mx-auto px-2 py-6 space-y-4"
    >
      {/* 닉네임 */}
      <AuthInput
        type={"text"}
        label={"닉네임"}
        name={"username"}
        placeholder={"닉네임"}
      />

      {/* 아이디 */}
      <AuthInput
        type={"text"}
        label={"아이디"}
        name={"id"}
        placeholder={"아이디"}
      />

      {/* 비밀번호 */}
      <AuthInput
        type={"password"}
        label={"비밀번호"}
        name={"password"}
        placeholder={"비밀번호"}
      />

      {/* 제출버튼 */}

      <AuthButton label="회원가입" isPending={isPending} />

      {msg && <AuthMsg msg={msg} />}
    </form>
  );
}
