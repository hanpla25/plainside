"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "../../utils/supabase/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

type AuthFormResponse = {
  message: string;
  errors?: {
    name?: string[];
    id?: string[];
    password?: string[];
  };
  inputs?: {
    name?: string;
    id?: string;
    password?: string;
  };
};

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름이 너무 짧아요 (2글자 이상)" })
    .max(8, { message: "이름이 너무 길어요.(8글자 이하)" }),

  id: z
    .string()
    .min(4, { message: "아이디가 너무 짧아요 (4글자 이상)" })
    .max(8, { message: "아이디가 너무 길어요 (8글자 이하)" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "아이디는 영어와 숫자만 사용할 수 있어요.",
    }),

  password: z
    .string()
    .min(4, { message: "비밀번호 너무 짧아요 (4글자 이상)" })
    .max(8, { message: "비밀번호 너무 길어요 (8글자 이하)" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "비밀번호는 영어와 숫자만 사용할 수 있어요.",
    }),
});

export async function signUp(
  _prevState: AuthFormResponse | null,
  formData: FormData
): Promise<AuthFormResponse> {
  const supabase = await createClient();

  try {
    const rawData = {
      name: formData.get("name") as string,
      id: formData.get("id") as string,
      password: formData.get("password") as string,
    };

    const result = signUpSchema.safeParse(rawData);

    if (!result.success) {
      return {
        message: "입력을 확인해주세요",
        errors: result.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    const { name, id, password } = result.data;

    const { error } = await supabase
      .from("users")
      .insert({ name: name, id: id, password: password });

    if (
      error?.message ===
      `duplicate key value violates unique constraint "users_pkey"`
    ) {
      console.error(error);

      return {
        message: "이미 존재하는 아이디 입니다.",
        errors: { id: ["이미 존재하는 아이디 입니다."] },
        inputs: rawData,
      };
    }

    if (
      error?.message ===
      `duplicate key value violates unique constraint "users_user_name_key"`
    ) {
      console.error(error);

      return {
        message: "이미 존재하는 이름입니다.",
        errors: { name: ["이미 존재하는 이름 입니다."] },
        inputs: rawData,
      };
    }
  } catch (error) {
    console.error(error);

    return {
      message: "오류가 발생했습니다.",
    };
  }
  redirect("/signin");
}

export async function signIn(
  _prevState: string | null,
  formData: FormData
): Promise<string> {
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl") as string;

  try {
    const data = {
      id: formData.get("id") as string,
      password: formData.get("password") as string,
    };

    const { id, password } = data;

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
  } catch (error) {
    console.error(error);

    return "로그인중 에러가 발생했습니다.";
  }

  redirect(callbackUrl);
}

export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
