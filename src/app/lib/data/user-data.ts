"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createClient } from "../../utils/supabase/server";

// --- types ---
import { UserData, UserPayload } from "../definitions";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET 환경 변수 없음");
}
const JWT_SECRET: string = jwtSecret;

export async function getUserFromToken(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === "object" &&
      "user_id" in decoded &&
      "user_name" in decoded
    ) {
      const { user_id, user_name, created_at } = decoded as UserPayload;
      return { user_id, user_name, created_at };
    }

    return null;
  } catch (err) {
    console.warn("JWT decode 실패", err);
    return null;
  }
}

export async function fetchUserData(
  token: UserPayload
): Promise<UserData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("id,name,write_count,comment_count,created_at")
    .eq("id", token.user_id)
    .single();

  if (error) {
    console.error("유저 데이터 조회 에러:", error.message);
    return null;
  }

  return data ?? null;
}
