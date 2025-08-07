"use client";

import { useActionState } from "react";

// --- Actions ---
import { createGallToSupabase } from "@/app/lib/actions/create-gall-actions";
import AuthInput from "../auth/AuthInput";
import AuthButton from "../auth/AuthButton";
import AuthMsg from "../auth/AuthMsg";

export default function CreateGallForm() {
  const [msg, formAction, isPending] = useActionState(
    createGallToSupabase,
    null
  );

  return (
    <form
      action={formAction}
      className="lg:px-0 max-w-lg mx-auto px-2 py-6 space-y-4"
    >
      <AuthInput
        type="text"
        label="갤러리 이름 (갤러리는 자동으로 붙어요)"
        name="gallName"
        placeholder="예: 고양이"
      />

      <AuthInput
        type="text"
        label={"갤러리 주소(영문 약어)"}
        name={"abbr"}
        placeholder={"예: cat"}
      />

      <AuthButton isPending={isPending} label={"신청하기"} />

      {msg && <AuthMsg msg={msg} />}
    </form>
  );
}
