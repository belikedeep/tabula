"use client";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import { useEffect } from "react";

const Editor = () => {
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        //TODO: Add more tools and properties
        //TODO: can add some for premium users
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
  };

  useEffect(() => {
    initEditor();
  }, []);

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default Editor;
