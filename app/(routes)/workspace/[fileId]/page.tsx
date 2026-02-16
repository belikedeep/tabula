"use client";
import { use, useEffect, useState } from "react";
import Editor from "../_components/editor";
import WorkspaceHeader from "../_components/workspaceHeader";
import { Id } from "@/convex/_generated/dataModel";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/fileList";

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
    console.log(result);
    setFileData(result);
  };

  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* document */}
        <div className="h-screen">
          {fileData && (
            <Editor
              onSaveTrigger={triggerSave}
              fileId={fileId}
              fileData={fileData}
            />
          )}
        </div>
        {/* canvas */}
        <div className="bg-red-400 h-screen">Canvas</div>
      </div>
    </div>
  );
};

export default WorkspacePage;
