import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { LogOut, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RetroWindow from "@/app/_components/retro-window";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user, setActiveTeamInfo }: any) => {
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>();
  const convex = useConvex();
  const router = useRouter();

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
    setTeamList(result);
    if (result?.length > 0) {
      setActiveTeam(result[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="shrink-0 px-3 pb-2">
        <h1 className="font-black text-2xl tracking-tighter uppercase text-purple-600 select-none">
          Tabula
        </h1>
      </div>

      {/* 1. User Profile Window */}
      <RetroWindow title="User Profile">
        <div className="p-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt="user"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-foreground"
                />
              ) : (
                <div className="h-9 w-9 bg-secondary rounded-full border-2 border-foreground" />
              )}
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold uppercase">
                  {user.given_name} {user.family_name}
                </p>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="truncate text-[10px] font-bold text-muted-foreground uppercase">
                    Online
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-10 w-full animate-pulse bg-secondary/20" />
          )}

          <div className="mt-3 pt-3 border-t-2 border-dashed border-foreground/20">
            <LogoutLink className="flex w-full items-center justify-center gap-2 rounded-none bg-red-100 hover:bg-red-200 border-2 border-transparent p-1.5 text-[10px] font-bold uppercase text-red-600 transition-all hover:border-red-600 hover:shadow-[2px_2px_0_0_var(--foreground)]">
              <LogOut className="h-3 w-3" />
              Sign Out
            </LogoutLink>
          </div>
        </div>
      </RetroWindow>

      {/* 2. Teams Window */}
      <RetroWindow
        title="Teams"
        variant="warning"
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="p-2 space-y-2 overflow-y-auto flex-1 custom-scrollbar">
          {teamList && teamList.length > 0 ? (
            teamList.map((team) => (
              <div
                key={team._id}
                onClick={() => setActiveTeam(team)}
                className={`group cursor-pointer border-2 p-2 transition-all hover:shadow-[2px_2px_0_0_var(--foreground)] ${
                  activeTeam?._id === team._id
                    ? "border-foreground bg-secondary text-secondary-foreground"
                    : "border-transparent hover:border-foreground hover:bg-yellow-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase truncate">
                    {team.teamName}
                  </span>
                  {activeTeam?._id === team._id && (
                    <div className="h-2 w-2 bg-green-500 rounded-full border border-foreground" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-[10px] p-2 text-center text-muted-foreground uppercase">
              Loading Teams...
            </p>
          )}
        </div>

        <div className="p-2 border-t-2 border-foreground bg-background">
          <Button
            variant="outline"
            className="w-full rounded-none border-2 border-dashed border-foreground bg-transparent text-[10px] font-bold uppercase hover:bg-yellow-200 hover:border-solid hover:text-foreground shrink-0"
            onClick={() => router.push("/teams/create")}
          >
            <Plus className="mr-1 h-3 w-3" /> Add Team
          </Button>
        </div>
      </RetroWindow>
    </div>
  );
};

export default SideNavTopSection;
