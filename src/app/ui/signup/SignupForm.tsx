"use client";

import { useActionState } from "react";
import Form from "next/form";

// --- actions ---
import { signUpAction } from "@/app/lib/actions/auth-actions";

// --- UI ---
import { FormInput, FormMsg, FormSubmitButton } from "../common/FormUi";

export default function SignupForm() {
  const [msg, formAction, isPendig] = useActionState(signUpAction, null);
  return (
    <Form
      action={formAction}
      className="lg:px-0 max-w-lg mx-auto px-2 space-y-4"
    >
      <FormInput
        label="닉네임"
        type="text"
        name="name"
        placeholder="닉네임을 입력해주세요. (2자 이상 8자 이하)"
      />

      <FormInput
        label="아이디"
        type="text"
        name="id"
        placeholder="아이디를 입력해주세요. (영어 + 숫자 4자 이상 10자 이하)"
      />

      <FormInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요. (영어 + 숫자 4자 이상 10자 이하)"
      />

      <FormSubmitButton label="회원가입" isPending={isPendig} />

      {msg && <FormMsg msg={msg} />}
    </Form>
  );
}
