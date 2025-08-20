"use server";

import { headers } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

// --- 데이터 ---
import { getUserToken } from "../data/user-data";
import { JSONContent } from "@tiptap/react";
import { redirect } from "next/navigation";

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
  console.log(typeof contentObj);
  console.log(contentObj);

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
  const userToken = await getUserToken();
  const isLogin = !!userToken;

  const ipAddress = await getIp();

  const userId = userToken ? userToken.user_id : null;
  const name = formData.get("name");
  const title = formData.get("title");
  const content = formData.get("content");
  const password = formData.get("password");
  const abbr = formData.get("abbr");
  const gallName = formData.get("gallName");

  if (typeof title !== "string" || typeof content !== "string") {
    return "잘못된 요청이에요.";
  }

  if (!isLogin) {
    if (typeof name !== "string" || typeof password !== "string") {
      console.log("저기");
      return "잘못된 요청이에요.";
    }
  }

  const contentObj = JSON.parse(content);

  const imageNames = extractImageNamesFromContent(content);

  for (const imageName of imageNames) {
    await moveImage(imageName);
  }

  updateContentImagePaths(contentObj);

  const updatedContent = JSON.stringify(contentObj);

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
    .select()
    .single();

  if (error) {
    console.error(error);
    return "글쓰기중 에러가 발생했습니다.";
  }

  if (userToken)
    await supabase.rpc("increment_write_count", { user_id: userId });
  const postId = data.id;

  redirect(`/${abbr}/${postId}`);
}
