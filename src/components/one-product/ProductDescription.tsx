import { EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Json } from "../../supabase/supabase";

interface Props {
  content: JSONContent | Json;
}

export const ProductDescription = ({ content }: Props) => {
	
  const editor = useEditor({
    extensions: [StarterKit],
    content: content as JSONContent,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none",
      },
    },
  });
	
  return (
    <div className="mt-12">
      <h2 className="mb-8 text-2xl font-bold text-center underline">
        Descripción
      </h2>
      {<EditorContent editor={editor} />}
    </div>
  );
};
