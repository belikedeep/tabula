import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";

export const Header = () => {
  const { user } = useKindeBrowserClient();
  return (
    <div className="flex justify-end w-full gap-6 items-center">
      <div className="flex gap-2 items-center border-2 border-black rounded-none p-2 px-3 w-full bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <Search className="h-4 w-4 text-black" />
        <input
          className="outline-none w-full bg-transparent placeholder:text-gray-500 text-sm font-mono"
          type="text"
          placeholder="Find a masterpiece..."
        />
      </div>
      <div>
        <Button className="bg-black text-white hover:bg-gray-800 rounded-none h-10 px-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-mono text-sm border-2 border-black uppercase">
          + New File
        </Button>
      </div>
    </div>
  );
};
