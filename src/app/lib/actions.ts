"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AuthForm, LoginFormState } from "./definition";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

const signUpSchema = z.object({
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
  name: z
    .string()
    .min(2, { message: "이름이 너무 짧습니다. (2자 이상)" })
    .max(6, { message: "이름이 너무 깁니다. (6자 이하)" }),
});

const loginSchema = z.object({
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

export async function signUp(
  _prevState: LoginFormState,
  formdata: FormData
): Promise<LoginFormState> {
  const supabase = await createClient();

  const rawData: AuthForm = {
    id: formdata.get("id") as string,
    password: formdata.get("password") as string,
    name: formdata.get("name") as string,
  };

  const result = signUpSchema.safeParse(rawData);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      idErrorMsg: errors.id?.[0],
      passwordErrorMsg: errors.password?.[0],
      nameErrorMsg: errors.name?.[0],
      errorMsg:
        errors.id || errors.password || errors.name
          ? undefined
          : "이름, 아이디, 비밀번호를 모두 입력해주세요",
    };
  }

  const { id, password, name } = result.data;

  const { error } = await supabase
    .from("users")
    .insert({ user_id: id, password, user_name: name });

  if (error) {
    console.error(error);

    if (error.message.includes("users_user_name_key")) {
      return {
        nameErrorMsg: "이미 사용중인 이름입니다.",
        input: rawData,
      };
    }

    if (error.message.includes("users_pkey")) {
      return {
        idErrorMsg: "이미 사용중인 아이디입니다.",
        input: rawData,
      };
    }

    return {
      errorMsg: "회원가입 중 문제가 발생했습니다. 다시 시도해주세요.",
      input: rawData,
    };
  }

  redirect("/login");
}

export async function login(
  _prevState: LoginFormState,
  formdata: FormData
): Promise<LoginFormState> {
  const supabase = await createClient();

  const rawData: AuthForm = {
    id: formdata.get("id") as string,
    password: formdata.get("password") as string,
    redirectTo: formdata.get("redirectTo") as string,
  };

  const result = loginSchema.safeParse(rawData);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      idErrorMsg: errors.id?.[0],
      passwordErrorMsg: errors.password?.[0],
      errorMsg:
        errors.id || errors.password
          ? undefined
          : "이름, 아이디, 비밀번호를 모두 입력해주세요",
    };
  }

  const { id, password } = result.data;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    return {
      idErrorMsg: "아이디가 일치하지 않습니다.",
      input: rawData,
    };
  }

  if (user.password !== password) {
    return {
      passwordErrorMsg: "비밀번호가 일치하지 않습니다.",
      input: rawData,
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

  redirect(`${rawData.redirectTo}`);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
