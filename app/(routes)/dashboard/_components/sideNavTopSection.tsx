import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SideNavTopSection = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-200 m-3 cursor-pointer">
            <h2>Team Name</h2>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>Hello World</PopoverContent>
    </Popover>
  );
};

export default SideNavTopSection;
