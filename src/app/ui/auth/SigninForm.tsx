"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";

// --- Actions ---
import { signin } from "@/app/lib/actions/auth-actions";

// --- UI ---
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthMsg from "./AuthMsg";

export default function SigninForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [msg, formAction, isPending] = useActionState(signin, null);
  const [inputName, setInputName] = useState("");

  return (
    <form
      action={formAction}
      className="lg:px-0 max-w-lg mx-auto px-2 py-6 space-y-4"
    >
      {/* 아이디 */}
      <AuthInput
        type={"text"}
        label={"아이디"}
        name={"id"}
        placeholder={"아이디"}
        setInputName={setInputName}
        defaultValue={inputName}
      />

      {/* 비밀번호 */}
      <AuthInput
        type={"password"}
        label={"비밀번호"}
        name={"password"}
        placeholder={"비밀번호"}
      />

      {/* 제출버튼 */}
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <AuthButton label="회원가입" isPending={isPending} />
      {msg && <AuthMsg msg={msg} />}
    </form>
  );
}
