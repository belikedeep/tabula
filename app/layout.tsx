import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tabula - High-Performance Workspace",
  description:
    "A high-performance workspace for teams who love the future and respect the past. Markdown-first collaborative editing and vector-perfect whiteboard canvas.",
  keywords: [
    "workspace",
    "collaboration",
    "docs",
    "whiteboard",
    "markdown",
    "real-time",
  ],
  authors: [{ name: "Tabula" }],
  openGraph: {
    title: "Tabula - High-Performance Workspace",
    description:
      "A high-performance workspace for teams who love the future and respect the past.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          {children}
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
