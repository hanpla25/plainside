import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  let reactElement = null;

  try {
    const json = JSON.parse(content);

    reactElement = renderToReactElement({
      content: json,
      extensions: [StarterKit, Image],
    });
  } catch (err) {
    console.error("Invalid JSON content", err);
    reactElement = <p>내용을 불러올 수 없습니다.</p>;
  }

  return <div className="p-2">{reactElement}</div>;
}
