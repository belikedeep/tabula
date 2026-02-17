"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailLogin = () => {
    if (!email) return;

    const connectionId =
      process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_CODE_PASSWORDLESS;
    const params = new URLSearchParams({
      connection_id: connectionId || "",
      login_hint: email,
    });

    router.push(`/api/auth/login?${params.toString()}`);
  };

  const handleGoogleLogin = () => {
    const connectionId = process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE;
    const params = new URLSearchParams({
      connection_id: connectionId || "",
    });

    router.push(`/api/auth/login?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] p-4">
      <div className="w-full max-w-sm rounded-none border-2 border-foreground bg-background shadow-[8px_8px_0_0_var(--foreground)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-foreground bg-secondary/50 px-4 py-2">
          <span className="font-mono text-xs font-bold uppercase">
            user::login
          </span>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full border border-foreground bg-red-400" />
            <div className="h-2 w-2 rounded-full border border-foreground bg-yellow-400" />
            <div className="h-2 w-2 rounded-full border border-foreground bg-green-400" />
          </div>
        </div>

        {/* MAIN */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-black uppercase tracking-tighter">
              Auth.Session
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Identity confirmation required
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
                className="h-10 w-full border-2 border-foreground bg-transparent p-2 text-sm outline-none focus:bg-secondary/20"
                placeholder="name@example.com"
              />
            </div>

            <Button
              className="w-full bg-black text-white hover:brightness-110"
              onClick={handleEmailLogin}
              disabled={!email}
            >
              Continue with Email
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-foreground" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-2 border-foreground hover:bg-secondary/50"
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>

            <div className="mt-4 text-center">
              <Link
                href="/register"
                className="text-[10px] font-bold uppercase underline hover:text-primary"
              >
                Create new account
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t-2 border-foreground pt-4 text-center">
            <p className="text-[8px] font-bold uppercase text-muted-foreground">
              Security Provided By
            </p>
            <p className="font-black uppercase tracking-tighter text-purple-600">
              Kinde Auth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
