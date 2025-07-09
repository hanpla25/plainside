"use server";

import { redirect } from "next/navigation";
import { AuthFormData, AuthFormState } from "./definitions";
import { createClient } from "../utils/supabase/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

const authSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름이 너무 짧습니다. (2자 이상)" })
    .max(6, { message: "이름이 너무 깁니다. (6자 이하)" }),

  id: z
    .string()
    .min(4, { message: "아이디가 너무 짧습니다. (4자 이상)" })
    .max(8, { message: "아이디가 너무 깁니다. (8자 이하)" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "아이디는 영어와 숫자만 사용할 수 있습니다.",
    }),

  password: z
    .string()
    .min(4, { message: "비밀번호가 너무 짧습니다. (4자 이상)" })
    .max(8, { message: "비밀번호가 너무 깁니다. (8자 이하)" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "비밀번호는 영어와 숫자만 사용할 수 있습니다.",
    }),
});

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const callbackUrl = formData.get("callbackUrl" as string);
  console.log(callbackUrl);

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    return {
      msg: "아이디가 일치하지 않습니다.",
      inputs: {
        id: "",
        password: password,
      },
    };
  }

  if (user.password !== password) {
    return {
      msg: "비밀번호가 일치하지 않습니다.",
      inputs: {
        id: id,
        password: "",
      },
    };
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      user_name: user.user_name,
      created_at: user.created_at,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(`${callbackUrl}`);
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const supabase = await createClient();

  const rawData: AuthFormData = {
    id: (formData.get("id") ?? "") as string,
    password: (formData.get("password") ?? "") as string,
    name: (formData.get("name") ?? "") as string,
  };

  console.log(rawData);

  const parsed = authSchema.safeParse(rawData);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();

    return {
      inputs: { ...rawData, password: "" },
      errors: fieldErrors,
    };
  }

  const { id, password, name } = parsed.data;

  const { count: idCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("user_id", id);

  if (idCount && idCount > 0) {
    return {
      errors: { id: ["이미 사용 중인 아이디입니다."] },
      inputs: { ...rawData, password: "" },
    };
  }

  const { count: nameCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("user_name", name);

  if (nameCount && nameCount > 0) {
    return {
      errors: { name: ["이미 사용 중인 이름입니다."] },
      inputs: { ...rawData, password: "" },
    };
  }

  const { error } = await supabase
    .from("users")
    .insert({ user_id: id, password, user_name: name });

  if (error) {
    console.error("[Supabase insert error]", error);
    return {
      msg: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      inputs: { ...rawData, password: "" },
    };
  }

  redirect("/login");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
