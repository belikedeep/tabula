import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
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
import Constants from "@/app/_constants/Constants";
import PricingDialog from "./pricingDialog";

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
      icon: Github,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: "",
    },
  ];

  return (
    <div className="p-5 flex flex-col gap-4">
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="group flex cursor-pointer items-center gap-2 border-2 border-transparent p-2 text-sm font-bold uppercase transition-all hover:border-foreground hover:bg-purple-100 hover:shadow-[2px_2px_0_0_var(--foreground)] active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <menu.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
          {menu.name}
        </h2>
      ))}

      {/* Add new file button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">New File</Button>
        </DialogTrigger>
        {totalFiles < Constants.MAX_FREE_FILES ? (
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
        ) : (
          <PricingDialog />
        )}
      </Dialog>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div
          className="h-4 bg-primary rounded-full"
          style={{ width: `${(totalFiles / Constants.MAX_FREE_FILES) * 100}%` }}
        ></div>
      </div>

      <h2>
        {totalFiles} out of {Constants.MAX_FREE_FILES} files used
      </h2>
      <h2>Upgrade your plan for unlimited access </h2>
    </div>
  );
};

export default SideNavBottomSection;
