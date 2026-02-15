import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SideNavBottomSection = ({ onFileCreate, totalFiles }: any) => {
  const [fileInput, setFileInput] = useState("");

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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">New File</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New file</DialogTitle>
            <DialogDescription>
              <Input
                onChange={(e) => setFileInput(e.target.value)}
                placeholder="Enter file name"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              {/* TODO can add lenth condition as well */}
              <Button
                disabled={!fileInput}
                type="button"
                onClick={() => onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div
          className="h-4 bg-primary rounded-full"
          style={{ width: `${(totalFiles / 5) * 100}%` }}
        ></div>
      </div>

      <h2>{totalFiles} out of 5 files used</h2>
      <h2>Upgrade your plan for unlimited access </h2>
    </div>
  );
};

export default SideNavBottomSection;
