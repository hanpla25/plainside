"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Form from "next/form";

// --- actions ---
import { signInAction } from "@/app/lib/actions/auth-actions";

// --- UI ---
import { FormInput, FormMsg, FormSubmitButton } from "../common/FormUi";

export default function SigninForm() {
  const searchParams = useSearchParams();
  const [msg, formAction, isPending] = useActionState(signInAction, null);

  return (
    <Form
      action={formAction}
      className="lg:px-0 max-w-lg mx-auto px-2 space-y-4"
    >
      <FormInput
        label="아이디"
        type="text"
        name="id"
        placeholder="아이디를 입력해주세요."
      />

      <FormInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
      />

      <input
        type="hidden"
        name="callbackUrl"
        value={searchParams.get("callbackUrl") ?? "/"}
      />

      <FormSubmitButton label="로그인" isPending={isPending} />

      {msg && <FormMsg msg={msg} />}
    </Form>
  );
}
