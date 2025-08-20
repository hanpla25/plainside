"use server";

import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- jwt ---
import jwt from "jsonwebtoken";
import {
  idRegex,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  passwordRegex,
  usernameRegex,
} from "@/app/constants/auth-constants";

const authSchema = (name: string, id: string, password: string) => {
  if (!usernameRegex.test(name)) {
    return "사용자 이름은 2~8자의 한글 또는 영어만 가능합니다.";
  }

  if (!idRegex.test(id)) {
    return "아이디는 4~10자의 영어 또는 숫자만 가능합니다.";
  }

  if (!passwordRegex.test(password)) {
    return "비밀번호는 4~10자의 영어 또는 숫자만 가능합니다.";
  }
};

export async function signInAction(
  _prevState: string | null,
  formData: FormData
): Promise<string> {
  const id = formData.get("id");
  const password = formData.get("password");
  const callbackUrl = formData.get("callbackUrl");

  if (
    typeof id !== "string" ||
    typeof password !== "string" ||
    typeof callbackUrl !== "string"
  ) {
    return "잘못된 요청이에요.";
  }

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

export async function signUpAction(
  _prevState: string | null,
  formData: FormData
): Promise<string> {
  const name = formData.get("name");
  const id = formData.get("id");
  const password = formData.get("password");

  if (
    typeof name !== "string" ||
    typeof id !== "string" ||
    typeof password !== "string"
  ) {
    return "잘못된 요청이에요.";
  }

  const schmaMsg = authSchema(name, id, password);

  if (schmaMsg) return schmaMsg;

  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .insert({ name: name, id: id, password: password });

  if (error) {
    console.error(error);

    return "이미 사용중인 아이디거나 닉네임 입니다.";
  }

  redirect("/signin");
}

export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
