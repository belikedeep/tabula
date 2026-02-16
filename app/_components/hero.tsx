import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";

const HERO_CONTENT = {
  badge: "Version 2.0 - Ultra Modern",
  title: "Tabula",
  subtitle:
    "A high-performance workspace for teams who love the future and respect the past.",
  cta: "Enter Workspace",
  stickyNote: '"Better than a pencil."',
  footerLinks: ["Privacy First", "AI Powered", "Realtime"],
};

const FEATURES = [
  {
    title: "Docs",
    description: "Markdown-first collaborative editing.",
    color: "bg-red-100",
  },
  {
    title: "Whiteboard",
    description: "Vector-perfect canvas for architects.",
    color: "bg-green-100",
  },
];

const RetroBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8 -rotate-2 transform select-none">
    <span className="bg-yellow-400 border-2 border-foreground px-4 py-1 text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_0_var(--foreground)]">
      {children}
    </span>
  </div>
);

const FeatureCard = ({ feature }: { feature: (typeof FEATURES)[number] }) => (
  <div
    className={`flex flex-col justify-center rounded-none border-2 border-foreground p-6 shadow-[4px_4px_0_0_var(--foreground)] ${feature.color}`}
  >
    <h3 className="mb-2 font-bold uppercase">{feature.title}</h3>
    <p className="text-xs text-muted-foreground">{feature.description}</p>
  </div>
);

const WindowHeader = () => (
  <div className="flex items-center justify-between border-b-2 border-foreground bg-secondary/50 px-4 py-3">
    <span className="font-mono text-sm font-bold uppercase">system.init()</span>
    <div className="flex gap-2">
      <div className="h-3 w-3 rounded-full border border-foreground bg-red-400" />
      <div className="h-3 w-3 rounded-full border border-foreground bg-yellow-400" />
      <div className="h-3 w-3 rounded-full border border-foreground bg-green-400" />
    </div>
  </div>
);

const RetroWindow = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full max-w-3xl px-4">
    <div className="overflow-hidden rounded-none border-2 border-foreground bg-background shadow-[8px_8px_0_0_var(--foreground)]">
      <WindowHeader />
      <div className="p-8">{children}</div>
    </div>
  </div>
);

const StickyNote = ({ text }: { text: string }) => (
  <div className="absolute bottom-8 right-8 hidden rotate-3 transform md:block">
    <div className="w-48 bg-foreground p-4 text-center text-sm font-bold text-background shadow-lg">
      {text}
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full overflow-hidden bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] py-12 md:py-24">
      <RetroBadge>{HERO_CONTENT.badge}</RetroBadge>

      <h1 className="mb-4 text-center text-6xl font-black uppercase tracking-tighter md:text-8xl lg:text-9xl">
        {HERO_CONTENT.title}
      </h1>

      <p className="mb-12 max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
        {HERO_CONTENT.subtitle}
      </p>

      <RetroWindow>
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

        <LoginLink>
          <Button
            className="w-full bg-purple-600 py-8 text-xl font-bold uppercase hover:bg-purple-700"
            inverse
          >
            {HERO_CONTENT.cta}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </LoginLink>

        <div className="mt-6 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {HERO_CONTENT.footerLinks.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
      </RetroWindow>

      <StickyNote text={HERO_CONTENT.stickyNote} />
    </section>
  );
};

export default Hero;
