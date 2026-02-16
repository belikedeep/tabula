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
  const [mounted, setMounted] = useState(false);
  const { fileList_, setFileList_ } = useContext(fileListContext)

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    console.log(fileName);
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
          toast("file created successfully");
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
    console.log(result);
    setFileList_(result);
    setTotalFiles(result.length);
  };

  return (
    <div className="flex flex-col bg-gray-300 h-screen fixed w-72 border-r border-gray-200">
      <div className="flex-1">
        {mounted && (
          <SideNavTopSection
            user={user}
            setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
          />
        )}
      </div>
      <div className=" ">
        {mounted && (
          <SideNavBottomSection
            totalFiles={totalFiles}
            onFileCreate={onFileCreate}
          />
        )}
      </div>
    </div>
  );
};

export default SideNav;
