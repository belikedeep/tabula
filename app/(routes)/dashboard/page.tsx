"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useEffect } from "react";
import { Header } from "./_components/header";
import FileList from "./_components/fileList";

const Dashboard = () => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();

  // const getUser = useQuery(api.user.getUser, {
  //   email: user?.email!,
  // });

  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      // console.log(getUser);
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, {
      email: user?.email!,
    });
    // if (getUser === undefined) return;
    if (result.length === 0) {
      createUser({
        name: user?.given_name || "",
        email: user?.email || "",
        image: user?.picture || "",
      }).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <div className="px-10 pt-20">
      <Header />
      <FileList />
    </div>
  );
};

export default Dashboard;
