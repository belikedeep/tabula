import { Button } from "@/components/ui/button";
import Link from "next/link";

const WorkspaceHeader = ({ onSave, fileName }: any) => {
  return (
    <div className="p-4 flex justify-between items-center border-b-2 border-black bg-white">
      <div className="flex gap-5 items-center">
        <Link 
          href="/dashboard"
          className="font-bold border-2 border-black p-1 px-3 bg-yellow-300 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer uppercase font-mono text-sm text-black"
        >
          Tabula
        </Link>
        <div className="font-mono text-sm font-semibold">{fileName || "Loading..."}</div>
      </div>
      <div>
        <div className="flex gap-4">
          <Button onClick={() => onSave()} className="bg-black text-white hover:bg-gray-800 rounded-none h-10 px-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-mono text-xs border-2 border-black uppercase font-bold">
            Save
          </Button>
          <Button className="bg-white text-black hover:bg-gray-100 rounded-none h-10 px-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-mono text-xs border-2 border-black uppercase font-bold">
            Export/Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
