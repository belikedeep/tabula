"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");

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
        <Button disabled={!teamName && teamName?.length > 0}>Create</Button>
      </div>
    </div>
  );
};

export default CreateTeam;
