"use client";
import { useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/fileList";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "1",
      type: "header",
    },
    //TODO: not working lookinto it
    // {
    //   data: {
    //     level: 4,
    //   },
    //   id: "2",
    //   type: "header",
    // },
  ],
  version: "2.8.1",
};
// TODO: can be refactored, onSaveTrigger is not boolean??
const Editor = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: Id<"files">;
  fileData: FILE;
}) => {
  const ref = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);
  const [document, setDocument] = useState(rawDocument);

  useEffect(() => {
    initEditor();
  }, []);

  useEffect(() => {
    console.log("onSaveTrigger", onSaveTrigger);
    onSaveDocument();
  }, [onSaveTrigger]);

  const initEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const EditorjsList = (await import("@editorjs/list")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        data: document,
        tools: {
          //TODO: Add more tools and properties
          //TODO: can add some only for premium users
          //TODO: can add some only for free users
          header: Header,
          List: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
      });
      ref.current = editor;
    }
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          }).then(
            (res) => {
              // TODO: very slow
              toast("Document saved successfully");
            },
            (e) => {
              toast("Server error");
            },
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default Editor;
