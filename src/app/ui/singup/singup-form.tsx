"use client";

import { signUp } from "@/app/lib/actions";
import { LoginFormState } from "@/app/lib/definition";
import { KeyRound, Loader2, LogIn } from "lucide-react";
import { useActionState } from "react";

export default function SignupForm() {
  const initialState: LoginFormState = {};
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg">
        <div className="mt-5">
          <div className="flex items-center mb-5">
            <label
              className="block text-xs font-medium text-neutral-900"
              htmlFor="name"
            >
              이름
            </label>
            <span className="ml-7 text-red-600 flex-1">
              {state.nameErrorMsg && state.nameErrorMsg}
            </span>
          </div>
          <div>
            <input
              className={`w-full rounded-md border py-[9px] pl-8 text-sm placeholder:text-gray-500 outline-2 ${
                state.nameErrorMsg ? "border-red-500" : "border-neutral-200"
              }`}
              id="name"
              type="text"
              name="name"
              placeholder="이름를 입력하세요."
              required
              minLength={2}
              defaultValue={state.input?.name}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center mb-5">
            <label
              className="block text-xs font-medium text-neutral-900"
              htmlFor="id"
            >
              아이디
            </label>
            <span className="ml-7 text-red-600 flex-1">
              {state.idErrorMsg && state.idErrorMsg}
            </span>
          </div>
          <div>
            <input
              className={`w-full rounded-md border py-[9px] pl-8 text-sm placeholder:text-gray-500 outline-2 ${
                state.idErrorMsg ? "border-red-500" : "border-neutral-200"
              }`}
              id="id"
              type="text"
              name="id"
              placeholder="아이디를 입력하세요."
              required
              minLength={4}
              defaultValue={state.input?.id}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center mb-5">
            <label
              className="block text-xs font-medium text-neutral-900"
              htmlFor="password"
            >
              비밀번호
            </label>
            <span className="ml-3.5 text-red-600 flex-1">
              {state.passwordErrorMsg && state.passwordErrorMsg}
            </span>
          </div>
          <div>
            <input
              className={`w-full rounded-md border py-[9px] pl-8 text-sm placeholder:text-gray-500 outline-2 ${
                state.passwordErrorMsg ? "border-red-500" : "border-neutral-200"
              }`}
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요."
              required
              minLength={4}
              defaultValue={state.input?.password}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`mt-8 w-full flex items-center justify-center cursor-pointer bg-neutral-200 outline-2 rounded-md py-[6px] ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isPending}
        >
          <span>회원가입</span>
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
            </>
          ) : (
            <>
              <KeyRound size={16} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
