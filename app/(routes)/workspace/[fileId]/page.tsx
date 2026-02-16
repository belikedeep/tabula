import Editor from "../_components/editor";
import WorkspaceHeader from "../_components/workspaceHeader";

const WorkspacePage = () => {
  return (
    <div>
      <WorkspaceHeader />

      {/* layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* document */}
        <div className="h-screen">
          <Editor />
        </div>
        {/* canvas */}
        <div className="bg-red-400 h-screen">Canvas</div>
      </div>
    </div>
  );
};

export default WorkspacePage;
