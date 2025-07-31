"use server";

import { headers } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import type { JSONContent } from "@tiptap/react";
import { redirect } from "next/navigation";
import { getUserFromToken } from "../data/data";

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

function updateContentImagePaths(contentObj: any) {
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

export async function insertPost(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const user = await getUserFromToken();

  const rawData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    userName: formData.get("userName") as string,
    abbr: formData.get("abbr") as string,
    gallName: formData.get("gallName") as string,
    ipAddress: formData.get("ipAddress") as string,
    userId: formData.get("userId") as string,
    password: formData.get("password") as string,
  };

  const { title, content, userName, gallName, abbr, userId, password } =
    rawData;

  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  const contentObj = JSON.parse(content);

  const imageNames = extractImageNamesFromContent(content);

  for (const imageName of imageNames) {
    await moveImage(imageName);
  }

  updateContentImagePaths(contentObj);

  const updatedContent = JSON.stringify(contentObj);

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      content: updatedContent,
      user_name: userName,
      gall_name: gallName,
      abbr,
      ip_address: ipAddress,
      user_id: userId,
      password: password,
    })
    .select()
    .single();

  if (error) console.error(error);

  if (user)
    await supabase.rpc("increment_write_count", { user_id: user.user_id });

  const postId = data.id;

  redirect(`/gallery/${abbr}/${postId}`);
}

export async function incrementLikeCount(postId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("like_count")
    .eq("id", postId)
    .single();

  if (error || !data) {
    console.error(error);
    return;
  }

  const newCount = data.like_count + 1;

  const { error: updateError } = await supabase
    .from("posts")
    .update({ like_count: newCount })
    .eq("id", postId);

  if (updateError) {
    console.error(error);

    return;
  }

  return newCount;
}

export async function incrementDisLikeCount(postId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("dislike_count")
    .eq("id", postId)
    .single();

  if (error || !data) {
    console.error(error);
    return;
  }

  const newCount = data.dislike_count + 1;

  const { error: updateError } = await supabase
    .from("posts")
    .update({ dislike_count: newCount })
    .eq("id", postId);

  if (updateError) {
    console.error(error);

    return;
  }

  return newCount;
}
