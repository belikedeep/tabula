import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

const SideNavBottomSection = () => {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      name: "Github",
      icon: Flag,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: Flag,
      path: "",
    },
  ];
  return (
    <div className="p-5 flex flex-col gap-4">
      {menuList.map((menu, index) => (
        <h2 key={index} className="flex gap-2 p-1 px-2 text-[14px]">
          <menu.icon className="h-5 w-5" />
          {menu.name}
        </h2>
      ))}

      {/* Add new file button */}
      <Button className="w-full">New File</Button>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div className={`h-4 bg-primary rounded-full w-[40%]`}></div>
      </div>

      <h2>1 out of 5 files used</h2>
      <h2>Upgrade your plan for unlimited access </h2>
    </div>
  );
};

export default SideNavBottomSection;
