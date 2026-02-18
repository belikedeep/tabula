"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/sideNav";
import { fileListContext } from "@/app/_context/fileListContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [fileList_, setFileList_] = useState<any>([]);

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email!,
    });

    if (!result.length) {
      router.push("/teams/create");
    }
  };
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]">
      <fileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="hidden h-screen w-72 fixed md:block">
          <SideNav />
        </div>
        <div className="md:ml-72">{children}</div>
      </fileListContext.Provider>
    </div>
  );
};

export default DashboardLayout;
