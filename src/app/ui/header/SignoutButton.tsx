"use client";

import React from "react";
import Form from "next/form";

// --- actions ---
import { signOut } from "@/app/lib/actions/auth-actions";

export default function SignoutButton() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm("로그아웃 할까요?")) {
      e.preventDefault();
    }
  };

  return (
    <Form action={signOut} onSubmit={handleSubmit}>
      <button type="submit" className="cursor-pointer w-full text-left">
        로그아웃
      </button>
    </Form>
  );
}
