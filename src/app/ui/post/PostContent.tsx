"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";

export default function PostContent({ content }: { content: string }) {
  const json = JSON.parse(content) as JSONContent;

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: json,
    extensions: [Document, Paragraph, Text, Image, Bold, Italic, Heading],
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
