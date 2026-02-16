import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { Id } from "@/convex/_generated/dataModel";
import { FILE } from "../../dashboard/_components/fileList";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

const Canvas = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: Id<"files">;
  fileData: FILE;
}) => {
  const [whiteboardData, setWhiteboardData] = useState<any>(
    fileData?.whiteboard ? JSON.parse(fileData.whiteboard) : [],
  );

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);

  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteboardData),
    }).then(() => console.log("Saved!"));
  };
  return (
    <div className="h-full w-full">
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) => {
            setWhiteboardData(excalidrawElements);
          }}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Heading>
                Welcome to Tabula
              </WelcomeScreen.Center.Heading>
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
