"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavTopSection, { TEAM } from "./sideNavTopSection";
import SideNavBottomSection from "./sideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { fileListContext } from "@/app/_context/fileListContext";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const { setFileList_ } = useContext(fileListContext);

  useEffect(() => {
    if (activeTeam) {
      getFiles();
    }
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    // console.log(fileName);
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id as string,
      createdBy: user?.email as string,
      archive: false,
      document: "",
      whiteboard: "",
    })
      .then((res) => {
        if (res) {
          getFiles();
          toast("File created successfully");
        }
      })
      .catch((e) => {
        toast("Error while creating file");
      });
  };

  const getFiles = async () => {
    if (!activeTeam) return;
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam._id,
    });
    // console.log(result);
    setFileList_(result);
    setTotalFiles(result.length);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden p-6 gap-4">
      <div className="flex-1 flex flex-col min-h-0">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div className="shrink-0">
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
};

export default SideNav;
