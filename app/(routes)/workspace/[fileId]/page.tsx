"use client";
import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Editor from "../_components/editor";
import WorkspaceHeader from "../_components/workspaceHeader";
import { Id } from "@/convex/_generated/dataModel";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/fileList";
import RetroWindow from "@/app/_components/retro-window";
const Canvas = dynamic(() => import("../_components/canvas"), {
  ssr: false,
});

const WorkspacePage = ({
  params,
}: {
  params: Promise<{ fileId: Id<"files"> }>;
}) => {
  const { fileId } = use(params);
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();

  useEffect(() => {
    getFileData();
  }, [fileId]);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: fileId,
    });
    setFileData(result);
  };

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] flex flex-col">
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} fileName={fileData?.fileName} />

      {/* layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-1 min-h-0">
        {/* document */}
        <div className="h-full min-h-0">
          {fileData && (
            <RetroWindow title="DOCUMENT" className="h-full w-full">
              <div className="h-full overflow-y-auto bg-white p-4">
                <Editor
                  onSaveTrigger={triggerSave}
                  fileId={fileId}
                  fileData={fileData}
                />
              </div>
            </RetroWindow>
          )}
        </div>
        {/* canvas */}
        <div className="h-full min-h-0">
          {fileData && (
            <RetroWindow title="WHITEBOARD" className="h-full w-full">
              <Canvas
                onSaveTrigger={triggerSave}
                fileId={fileId}
                fileData={fileData}
              />
            </RetroWindow>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
