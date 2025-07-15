"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름이 너무 짧습니다. (2자 이상)" })
    .max(6, { message: "이름이 너무 깁니다. (6자 이하)" })
    .optional(),

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

  callbackUrl: z.string().optional(),
});

export async function signIn(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const supabase = await createClient();

  const rawData = Object.fromEntries(formData.entries());
  const result = FormSchema.safeParse(rawData);

  if (!result.success) {
    const errorMsg = result.error.errors[0]?.message ?? "입력 오류";
    return errorMsg;
  }

  const { id, password, callbackUrl } = result.data;

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

  redirect(callbackUrl || "/");
}

export async function signOut() {
  const cookieStore = await cookies();
  
  cookieStore.delete("token");
}
