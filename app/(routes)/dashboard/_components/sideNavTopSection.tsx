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
import { ArrowDown, LogOut, Plus, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user, setActiveTeamInfo }: any) => {
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>();
  const convex = useConvex();

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    console.log("team List", result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Plus,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-4 p-5">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between gap-2 border-2 border-foreground bg-background p-3 transition-all hover:bg-yellow-300 hover:shadow-[4px_4px_0_0_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <div className="flex items-center gap-3 overflow-hidden">
              <h2 className="truncate font-mono text-sm font-bold uppercase tracking-tight">
                {activeTeam?.teamName || "Select Team"}
              </h2>
            </div>
            <ArrowDown className="h-4 w-4 shrink-0" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="mt-2 w-64 rounded-none border-2 border-foreground bg-background p-0 shadow-[4px_4px_0_0_var(--foreground)]">
          {/* Active Team Info */}
          <div className="border-b-2 border-foreground bg-secondary/20 p-4">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Active Team
            </span>
            <h2 className="mt-1 font-mono text-sm font-bold uppercase">
              {activeTeam?.teamName}
            </h2>
          </div>

          {/* Team List */}
          <div className="p-2">
            <span className="mb-2 block px-2 text-[10px] font-bold uppercase text-muted-foreground">
              Switch Team
            </span>
            {teamList?.map((team: TEAM) => (
              <div
                key={team._id}
                className={`group flex cursor-pointer items-center justify-between rounded-none p-2 text-sm font-medium transition-colors hover:bg-yellow-300 ${
                  activeTeam?._id === team._id
                    ? "bg-secondary text-secondary-foreground border-2 border-foreground"
                    : "hover:border-2 hover:border-foreground border-2 border-transparent"
                }`}
                onClick={() => setActiveTeam(team)}
              >
                <span className="font-mono uppercase">{team.teamName}</span>
                {activeTeam?._id === team._id && (
                  <div className="h-2 w-2 bg-green-500 rounded-full border border-foreground" />
                )}
              </div>
            ))}
          </div>

          <Separator className="bg-foreground" />

          {/* Menu Items */}
          <div className="p-2">
            {menu.map((item) => (
              <Link
                href={item.path}
                key={item.id}
                className="flex w-full items-center gap-2 rounded-none border-2 border-transparent p-2 text-sm font-bold uppercase transition-all hover:border-foreground hover:bg-purple-100 hover:shadow-[2px_2px_0_0_var(--foreground)]"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <LogoutLink className="flex w-full items-center gap-2 rounded-none border-2 border-transparent p-2 text-sm font-bold uppercase text-red-600 transition-all hover:border-foreground hover:bg-red-100 hover:shadow-[2px_2px_0_0_var(--foreground)]">
              <LogOut className="h-4 w-4" />
              Logout
            </LogoutLink>
          </div>

          <Separator className="bg-foreground" />

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 bg-secondary/10 p-3">
              {user?.picture && (
                <Image
                  src={user.picture}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full border border-foreground"
                />
              )}
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold uppercase">
                  {user?.given_name} {user?.family_name}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Primary Action Button */}
      <Button
        variant="outline"
        className="w-full justify-start gap-2 rounded-none border-2 border-foreground bg-transparent font-bold uppercase hover:bg-secondary/50 hover:shadow-[2px_2px_0_0_var(--foreground)]"
      >
        <Users className="h-4 w-4" />
        All files
      </Button>
    </div>
  );
};

export default SideNavTopSection;
