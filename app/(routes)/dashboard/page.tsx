"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useKindeBrowserClient();

  const getUser = useQuery(api.user.getUser, {
    email: user?.email!,
  });

  useEffect(() => {
    if (user) {
      console.log(getUser);
    }
  }, [user]);
  return (
    <div>
      {JSON.stringify(getUser)}
      Dashboard
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>
  );
};

export default Dashboard;
