import { fileListContext } from "@/app/_context/fileListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FileList = () => {
  interface FILE {
    _id: string;
    fileName: string;
    teamId: string;
    createdBy: string;
    _creationTime: number;
    archive: boolean;
    document: string;
    whiteboard: string;
  }

  const { fileList_ } = useContext(fileListContext);
  const [fileList, setFileList] = useState<FILE[]>([]);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created By
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList &&
              fileList.map((file: FILE, index: number) => (
                <tr key={index} className="odd:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(file._creationTime).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {file.createdBy}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {/* Placeholder for user image if available, or just email/name again */}
                    {user?.picture ? (
                      <Image
                        src={user?.picture}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        src="/user.png"
                        alt="user"
                        className="w-8 h-8 rounded-full"
                        width={30}
                        height={30}
                      />
                    )}
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
