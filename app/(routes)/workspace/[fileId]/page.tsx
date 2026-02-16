"use client";
import { useState } from "react";
import Editor from "../_components/editor";
import WorkspaceHeader from "../_components/workspaceHeader";

const WorkspacePage = () => {
  const [triggerSave, setTriggerSave] = useState(false);

  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* document */}
        <div className="h-screen">
          <Editor onSaveTrigger={triggerSave} />
        </div>
        {/* canvas */}
        <div className="bg-red-400 h-screen">Canvas</div>
      </div>
    </div>
  );
};

export default WorkspacePage;
