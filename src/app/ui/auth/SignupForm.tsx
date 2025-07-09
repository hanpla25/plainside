"use client";

import { signUp } from "@/app/lib/actions";
import ErrorMsg from "./ErrorMsg";
import TextInput from "./inputs";
import { AuthFormState } from "@/app/lib/definitions";
import { useActionState } from "react";
import { SubmitButton } from "./buttons";

export default function SignupForm() {
  const initialState = {
    msg: "",
  };

  const [state, formAction, isPending] = useActionState<
    AuthFormState,
    FormData
  >(signUp, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <TextInput
        type="text"
        label="이름"
        id="name"
        name="name"
        placeholder="이름을 입력해주세요"
        required
        minLength={2}
        defaultValue={state.inputs?.name}
      />
      {state.errors?.name && (
        <p className="text-sm text-red-500">{state.errors.name[0]}</p>
      )}

      <TextInput
        type="text"
        label="아이디"
        id="id"
        name="id"
        placeholder="아이디를 입력해주세요"
        required
        minLength={4}
        defaultValue={state.inputs?.id}
      />
      {state.errors?.id && (
        <p className="text-sm text-red-500">{state.errors.id[0]}</p>
      )}
      <TextInput
        type="password"
        label="비밀번호"
        id="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        required
        minLength={4}
        defaultValue={state.inputs?.password}
      />
      {state.errors?.password && (
        <p className="text-sm text-red-500">{state.errors.password[0]}</p>
      )}

      <ErrorMsg state={state} />
      <SubmitButton label="회원가입" isPending={isPending} />
    </form>
  );
}
