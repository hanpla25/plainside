"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// --- Constants ---
import {
  idRegex,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  passwordRegex,
  usernameRegex,
} from "@/app/constants/auth-constants";

export async function signup(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const rawData = {
    username: formData.get("username"),
    id: formData.get("id"),
    password: formData.get("password"),
  };

  const { username, id, password } = rawData;

  if (
    typeof username !== "string" ||
    typeof id !== "string" ||
    typeof password !== "string"
  ) {
    return "잘못된 형식이에요.";
  }

  if (!usernameRegex.test(username)) {
    return "사용자 이름은 2~8자의 한글 또는 영어만 가능합니다.";
  }

  if (!idRegex.test(id)) {
    return "아이디는 4~10자의 영어 또는 숫자만 가능합니다.";
  }

  if (!passwordRegex.test(password)) {
    return "비밀번호는 4~10자의 영어 또는 숫자만 가능합니다.";
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("users")
    .insert({ id: id, name: username, password: password });

  if (error) {
    console.error(error);

    return "이미 사용중인 아이디거나 닉네임 입니다.";
  }

  redirect("/");
}

export async function signin(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const rawData = {
    id: formData.get("id"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl") as string,
  };

  const { id, password, callbackUrl } = rawData;

  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return "아이디가 일치하지 않습니다.";
  if (user.password !== password) return "비밀번호가 일치하지 않습니다.";

  const token = jwt.sign(
    {
      user_id: user.id,
      user_name: user.name,
      created_at: user.created_at,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  redirect(callbackUrl);
}

export async function signout(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
