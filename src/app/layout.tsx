import type { Metadata } from "next";
import "./globals.css";
import { AppStickyNotes } from "@/components/sticky-notes-app-provider";

export const metadata: Metadata = {
  title: "Design System - reUI & cult-ui Inspired Components",
  description: "A comprehensive design system built on shadcn/ui with reUI and cult-ui inspired components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AppStickyNotes>{children}</AppStickyNotes>
      </body>
    </html>
  );
}
