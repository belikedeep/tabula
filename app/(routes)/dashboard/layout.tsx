import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    checkTeam();
  }, []);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email!,
    });

    return result;
  };
  return <div>{children}</div>;
};

export default DashboardLayout;
