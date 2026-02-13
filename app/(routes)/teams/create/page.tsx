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
        toast("Teams created successfully");
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center pt-20">
        <h2>What should we call your team</h2>
      </div>
      <div className="flex flex-col gap-2 justify-center pt-10">
        <Input
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
        />
        <Button
          onClick={() => createNewTeam()}
          disabled={!teamName && teamName?.length > 0}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
