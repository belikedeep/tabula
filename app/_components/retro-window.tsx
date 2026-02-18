import React from "react";

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "warning" | "error" | "success";
}

const RetroWindow = ({
  title,
  children,
  className = "",
  variant = "default",
}: RetroWindowProps) => {
  const getHeaderColor = () => {
    switch (variant) {
      case "warning":
        return "bg-yellow-300";
      case "error":
        return "bg-red-300";
      case "success":
        return "bg-green-300";
      default:
        return "bg-secondary/50";
    }
  };

  return (
    <div
      className={`flex flex-col rounded-none border-2 border-foreground bg-background shadow-[4px_4px_0_0_var(--foreground)] ${className}`}
    >
      {/* Window Header */}
      <div
        className={`shrink-0 flex items-center justify-between border-b-2 border-foreground px-3 py-2 ${getHeaderColor()}`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest truncate">
          {title}
        </span>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full border border-foreground bg-red-400" />
          <div className="h-2 w-2 rounded-full border border-foreground bg-yellow-400" />
          <div className="h-2 w-2 rounded-full border border-foreground bg-green-400" />
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 flex flex-col min-h-0 p-0">{children}</div>
    </div>
  );
};

export default RetroWindow;
