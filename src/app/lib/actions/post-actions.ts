"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

// --- 타입 ---
import { JSONContent } from "@tiptap/react";

// --- 데이터 ---
import { getUserToken } from "../data/user-data";

const getIp = async () => {
  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  return ipAddress;
};

async function getFilePath(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const filePath = `place-holder-images/${Date.now()}.${fileExt}`;

  return filePath;
}

async function uploadImageToSupabase(
  filePath: string,
  file: File
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (error) console.error(error);
}

async function getPublicUrl(filePath: string): Promise<string> {
  const supabase = await createClient();

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);

  return data.publicUrl;
}

async function moveImage(imageName: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("images")
    .move(`place-holder-images/${imageName}`, `post-images/${imageName}`);

  if (error) console.error(error);
}

function extractImageNamesFromContent(content: string): string[] {
  const contentObj = JSON.parse(content);

  const imageNames: string[] = [];

  function traverse(node: JSONContent) {
    if (node.type === "image" && node.attrs?.src) {
      try {
        const url = new URL(node.attrs.src);
        const pathParts = url.pathname.split("/");

        const fileName = pathParts[pathParts.length - 1];
        imageNames.push(fileName);
      } catch {}
    }

    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  }

  traverse(contentObj);

  return imageNames;
}

function convertSrcToNewPath(src: string): string {
  try {
    const url = new URL(src);
    const parts = url.pathname.split("/");
    const fileName = parts.pop();
    if (!fileName) return src;

    const newPath = `/storage/v1/object/public/images/post-images/${fileName}`;
    url.pathname = newPath;
    url.search = "";

    return url.toString();
  } catch {
    return src;
  }
}

function updateContentImagePaths(contentObj: JSONContent) {
  if (contentObj.type === "image" && contentObj.attrs?.src) {
    contentObj.attrs.src = convertSrcToNewPath(contentObj.attrs.src);
  }
  if (contentObj.content && Array.isArray(contentObj.content)) {
    for (const child of contentObj.content) {
      updateContentImagePaths(child);
    }
  }
}

export async function getImageUrl(file: File): Promise<string> {
  const filePath = await getFilePath(file);
  await uploadImageToSupabase(filePath, file);
  const publicUrl = await getPublicUrl(filePath);

  return publicUrl;
}

export async function writeAction(
  _prevState: string | null,
  formData: FormData
): Promise<string> {
  const [userToken, ipAddress] = await Promise.all([getUserToken(), getIp()]);
  const isLogin = !!userToken;

  const userId = userToken ? userToken.user_id : null;
  const name = userToken ? userToken.user_name : formData.get("name");
  const title = formData.get("title");
  const content = formData.get("content");
  const password = formData.get("password");
  const abbr = formData.get("abbr");
  const gallName = formData.get("gallName");

  if (typeof title !== "string" || typeof content !== "string") {
    return "잘못된 요청이에요.";
  }

  if (content.length === 0) {
    return "내용을 입력해주세요.";
  }

  if (!isLogin) {
    if (typeof name !== "string" || typeof password !== "string") {
      return "잘못된 요청이에요.";
    }
  }

  const contentObj = JSON.parse(content);

  const imageNames = extractImageNamesFromContent(content);

  for (const imageName of imageNames) {
    await moveImage(imageName);
  }

  updateContentImagePaths(contentObj);

  const updatedContent = contentObj;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: userId,
      user_name: name,
      title: title,
      content: updatedContent,
      abbr: abbr,
      gall_name: gallName,
      is_login: isLogin,
      password: password,
      ip_address: ipAddress,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    return "글쓰기중 에러가 발생했습니다.";
  }

  if (userToken) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("write_count")
      .eq("id", userToken.user_id)
      .single();

    if (!userError && userData) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ write_count: userData.write_count + 1 })
        .eq("id", userToken.user_id);

      if (updateError) {
        console.error("글쓰기 증가 실패:", updateError);
      }
    }
  }

  const postId = data.id;

  redirect(`/${abbr}/${postId}`);
}

export async function increaseCollumFromPosts({
  postId,
  collum,
}: {
  postId: number;
  collum: "like_count" | "dislike_count" | "comment_count";
}): Promise<number | null> {
  const supabase = await createClient();

  const collumMap = {
    like_count: "increment_post_like_count",
    dislike_count: "increment_post_dislike_count",
    comment_count: "increment_post_comment_count",
  };

  const { data, error } = await supabase.rpc(collumMap[collum], {
    post_id: postId,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data?.[0]?.[collum] ?? null;
}

export async function commentAction(formData: FormData) {
  const supabase = await createClient();
  const [userToken, ipAddress] = await Promise.all([getUserToken(), getIp()]);
  const isLogin = !!userToken;

  const abbr = formData.get("abbr");
  const postId = formData.get("postId");
  const userName = userToken ? userToken.user_name : formData.get("name");
  const password = formData.get("password");
  const content = formData.get("content");
  const parentId = formData.get("parentId");

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_name: userName,
    password,
    content,
    parent_id: parentId,
    is_login: isLogin,
    ip_address: ipAddress,
  });

  if (error) {
    console.error(error);
  }

  redirect(`/${abbr}/${postId}`);
}
