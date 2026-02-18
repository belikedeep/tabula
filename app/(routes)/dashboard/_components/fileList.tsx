import { fileListContext } from "@/app/_context/fileListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { FileText, MoreHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import RetroWindow from "@/app/_components/retro-window";

export interface FILE {
  _id: string;
  fileName: string;
  teamId: string;
  createdBy: string;
  _creationTime: number;
  archive: boolean;
  document: string;
  whiteboard: string;
}

const FileList = () => {
  const { fileList_ } = useContext(fileListContext);
  const [fileList, setFileList] = useState<FILE[]>([]);
  // const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-10">
      <RetroWindow title="DIR: /ENGINEERING GROUP" className="min-h-[500px]">
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {!fileList || fileList.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500 font-mono">
              [EMPTY DIRECTORY]
            </div>
          ) : (
            fileList.map((file: FILE, index: number) => (
              <div
                key={index}
                className="border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer bg-white relative group"
                onClick={() => router.push(`/workspace/${file._id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <FileText className="h-8 w-8 text-blue-300 stroke-[1.5]" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400">
                      {new Date(file._creationTime).toISOString().split("T")[0]}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-gray-200 rounded-none"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-none border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                        <DropdownMenuItem className="cursor-pointer font-mono text-xs hover:bg-red-100 focus:bg-red-100 text-red-600">
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <h3 className="font-bold font-sans text-lg mb-1 truncate">
                  {file.fileName}
                </h3>
                <p className="font-mono text-[10px] uppercase text-gray-500">
                  CREATED BY {file.createdBy}
                </p>
              </div>
            ))
          )}
        </div>
      </RetroWindow>
    </div>
  );
};

export default FileList;
