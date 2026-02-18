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
    <div className="flex-1 flex flex-col min-h-0">
      <RetroWindow
        title="DIR: /ENGINEERING GROUP"
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="border-t-0 bg-white flex-1 overflow-auto">
          <table className="w-full text-left font-mono">
            <thead>
              <tr className="border-b-2 border-black bg-gray-100 sticky top-0 z-10 shadow-sm">
                <th className="border-r-2 border-black p-3 font-bold uppercase text-xs border-b-2">
                  File Name
                </th>
                <th className="border-r-2 border-black p-3 font-bold uppercase text-xs border-b-2">
                  Created At
                </th>
                <th className="border-r-2 border-black p-3 font-bold uppercase text-xs border-b-2">
                  Created By
                </th>
                <th className="p-3 font-bold uppercase text-xs text-center w-[100px] border-b-2 border-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!fileList || fileList.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-10 text-center text-gray-500 font-mono border-b-2 border-black"
                  >
                    [EMPTY DIRECTORY]
                  </td>
                </tr>
              ) : (
                fileList.map((file: FILE, index: number) => (
                  <tr
                    key={index}
                    className="border-b-2 border-black transition-colors hover:bg-yellow-100 cursor-pointer group"
                    onClick={() => router.push(`/workspace/${file._id}`)}
                  >
                    <td className="border-r-2 border-black p-3 truncate max-w-[200px] font-bold">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        {file.fileName}
                      </div>
                    </td>
                    <td className="border-r-2 border-black p-3 text-xs">
                      {new Date(file._creationTime).toISOString().split("T")[0]}
                    </td>
                    <td className="border-r-2 border-black p-3 text-xs truncate max-w-[200px]">
                      {file.createdBy}
                    </td>
                    <td
                      className="p-3 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-white border-2 border-transparent hover:border-black rounded-none"
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </RetroWindow>
    </div>
  );
};

export default FileList;
