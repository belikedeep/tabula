import { Button } from "@/components/ui/button";

const WorkspaceHeader = ({ onSave }: any) => {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <div>Logo Image</div>
        <div>File Name</div>
      </div>
      <div>
        <div className="flex gap-2">
          <Button onClick={() => onSave()}>Save</Button>
          <Button>Export/Share</Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
