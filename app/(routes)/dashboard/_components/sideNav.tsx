"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavTopSection from "./sideNavTopSection";
import SideNavBottomSection from "./sideNavBottomSection";

const SideNav = () => {
  const { user } = useKindeBrowserClient();

  const onFileCreate = (fileName: string) => {
    console.log(fileName);
  };

  return (
    <div className="flex flex-col bg-gray-300 h-screen fixed w-72 border-r border-gray-200">
      <div className="flex-1">
        <SideNavTopSection user={user} />
      </div>
      <div className=" ">
        <SideNavBottomSection onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNav;
