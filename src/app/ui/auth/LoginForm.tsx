"use client";

import type { AuthFormState } from "@/app/lib/definitions";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { signIn } from "@/app/lib/actions";
import { SubmitButton } from "./buttons";
import TextInput from "./inputs";
import ErrorMsg from "./ErrorMsg";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const initialState = {
    msg: "",
  };

  const [state, formAction, isPending] = useActionState<
    AuthFormState,
    FormData
  >(signIn, initialState);

  return (
    <form className="space-y-4" action={formAction}>
      <TextInput
        type="text"
        label="아이디"
        id="id"
        name="id"
        placeholder="아이디를 입력해주세요"
        minLength={4}
        required
        defaultValue={state.inputs?.id}
      />

      <TextInput
        label="비밀번호"
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        minLength={4}
        required
        defaultValue={state.inputs?.password}
      />

      <ErrorMsg state={state} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <SubmitButton label="로그인" isPending={isPending} />
    </form>
  );
}
