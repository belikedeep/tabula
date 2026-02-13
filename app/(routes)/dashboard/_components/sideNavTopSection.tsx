import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";

const SideNavTopSection = ({ user }: { user: any }) => {
  const menu = [
    // TODO: add icons from lucide react
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
    },
    {
      id: 2,
      name: "Settings",
      path: "",
    },
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-200 m-3 cursor-pointer">
            <h2>Team Name</h2>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/* Team Section */}
        <div>
          <h2>Team Name</h2>
        </div>
        <Separator />

        {/* Menu Section */}
        <div>
          {menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <p>{item.name}</p>
            </Link>
          ))}
          <LogoutLink>
            <p>Logout</p>
          </LogoutLink>
        </div>
        <Separator />

        {/* User Info Section */}
        <div>
          {user?.picture && (
            <Image
              src={user.picture}
              alt="user image"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SideNavTopSection;
