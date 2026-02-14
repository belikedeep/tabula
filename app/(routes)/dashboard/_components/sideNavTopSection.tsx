import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user }: { user: any }) => {
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>();
  const convex = useConvex();

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    console.log("team List", result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };

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
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 m-3 cursor-pointer">
              {/* <Image
              src="/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="rounded"
            /> */}
              <h2>{activeTeam?.teamName}</h2>
              <ArrowDown />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {/* Team Section */}
          <div>
            {/* <h2>Team Name</h2> */}
            {teamList?.map((team: TEAM, index) => {
              return (
                <h2
                  className="p-2 m-1 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer"
                  key={team._id}
                  onClick={() => setActiveTeam(team)}
                >
                  {team.teamName}
                </h2>
              );
            })}
          </div>
          <Separator />

          {/* Menu Section */}
          <div>
            {menu.map((item) => (
              // TODO: can add custom method to handle menu items
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
              <div className="flex gap-2">
                <Image
                  src={user.picture}
                  alt="user image"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <h2>
                    {user.given_name} {user.family_name}
                  </h2>
                  <h2>{user.email}</h2>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* All files section */}
      <br />
      <Button variant="outline">All files</Button>
    </div>
  );
};

export default SideNavTopSection;
