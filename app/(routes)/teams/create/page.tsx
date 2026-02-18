"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email!,
    }).then((res) => {
      console.log(res);
      if (res) {
        router.push("/dashboard");
        toast("Team created successfully");
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]">
      <div className="border-b-2 border-foreground bg-background px-8 py-4">
        <h1 className="text-2xl font-black tracking-tighter uppercase select-none">
          Tabula
        </h1>
      </div>

      <div className="container mx-auto flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-none border-2 border-foreground bg-background shadow-[8px_8px_0_0_var(--foreground)]">
          <div className="flex items-center justify-between border-b-2 border-foreground bg-secondary/50 px-4 py-2">
            <span className="font-mono text-xs font-bold uppercase">
              team.wizard(v2.0)
            </span>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full border border-foreground bg-yellow-400" />
              <div className="h-2 w-2 rounded-full border border-foreground bg-green-400" />
              <div className="h-2 w-2 rounded-full border border-foreground bg-red-400" />
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-block bg-yellow-300 px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-foreground shadow-[2px_2px_0_0_var(--foreground)]">
                Team Initialization Phase
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter md:text-4xl text-purple-600">
                What should we
                <br />
                <span className="text-foreground">call your team?</span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative rounded-none border-2 border-dashed border-foreground bg-yellow-50/50 p-4">
                <div className="absolute -top-3 left-4 bg-yellow-400 border-2 border-foreground px-2 py-0.5 text-[10px] font-bold uppercase">
                  Note
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  A team is a shared workspace where you and your colleagues can
                  edit documents and draw on the whiteboard in real-time.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Workspace Identifier
                </label>
                <div className="relative">
                  <Input
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Dream Team Alpha"
                    className="h-12 w-full rounded-none border-2 border-foreground bg-transparent p-4 font-mono text-sm outline-none focus:bg-secondary/20 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                  />
                  {!teamName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground animate-pulse font-mono">
                      |
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-none border-2 border-foreground hover:bg-secondary/50 h-10 uppercase text-xs font-bold"
                  onClick={() => router.back()}
                >
                  ← Back
                </Button>
                <Button
                  className="w-full rounded-none bg-black text-white hover:brightness-110 h-10 border-2 border-transparent uppercase text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => createNewTeam()}
                  disabled={!teamName || teamName.length === 0}
                >
                  Create Team Space →
                </Button>
              </div>
            </div>

            <div className="mt-8 border-t-2 border-foreground pt-4 flex justify-between text-[8px] font-bold uppercase text-muted-foreground tracking-widest">
              <span>Encrypted.</span>
              <span>Collaborative.</span>
              <span>Instant.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
