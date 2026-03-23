import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
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
import RetroWindow from "@/app/_components/retro-window";

const SideNavBottomSection = ({ onFileCreate, totalFiles }: any) => {
  const [fileInput, setFileInput] = useState("");

  return (
    <RetroWindow title="Workspace" variant="success">
      <div className="p-3 space-y-4">
        {/* New File Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button id="new-file-btn" className="w-full rounded-none border-2 border-foreground bg-foreground text-background hover:bg-foreground/90 hover:shadow-[3px_3px_0_0_#94a3b8] transition-all active:translate-x-px active:translate-y-px active:shadow-none">
              <FilePlus className="mr-2 h-4 w-4" />
              <span className="font-bold uppercase tracking-wide text-xs">
                New File
              </span>
            </Button>
          </DialogTrigger>
          {totalFiles < Constants.MAX_FREE_FILES ? (
            <DialogContent className="rounded-none border-2 border-foreground shadow-[8px_8px_0_0_var(--foreground)]">
              <DialogHeader>
                <DialogTitle className="font-black uppercase tracking-tighter">
                  Create New File
                </DialogTitle>
                <DialogDescription className="font-mono text-xs uppercase">
                  Enter a name for your new document
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  onChange={(e) => setFileInput(e.target.value)}
                  placeholder="File Name"
                  className="rounded-none border-2 border-foreground bg-secondary/10 font-mono focus-visible:ring-0"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={!fileInput}
                    type="button"
                    onClick={() => onFileCreate(fileInput)}
                    className="w-full rounded-none border-2 border-foreground bg-black text-white hover:bg-foreground/90 uppercase font-bold"
                  >
                    Create File
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          ) : (
            <PricingDialog />
          )}
        </Dialog>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>Storage Used</span>
            <span>
              {totalFiles} / {Constants.MAX_FREE_FILES}
            </span>
          </div>
          <div className="h-3 w-full border-2 border-foreground bg-gray-100 p-px">
            <div
              className="h-full bg-green-400 transition-all duration-300"
              style={{
                width: `${Math.min((totalFiles / Constants.MAX_FREE_FILES) * 100, 100)}%`,
              }}
            />
          </div>
          {totalFiles >= Constants.MAX_FREE_FILES && (
            <p className="text-[8px] font-bold text-red-500 uppercase text-center animate-pulse">
              Limit Reached
            </p>
          )}
        </div>
      </div>
    </RetroWindow>
  );
};

export default SideNavBottomSection;
