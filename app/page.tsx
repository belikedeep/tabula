"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Header from "./_components/header";
import Hero from "./_components/hero";
import { useEffect } from "react";

const Home = () => {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("--", user);
  }, [user]);
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
