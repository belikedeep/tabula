import { Button } from "@/components/ui/button";

const WorkspaceHeader = () => {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <div>Logo Image</div>
        <div>File Name</div>
      </div>
      <div>
        <Button>Export/Share</Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
