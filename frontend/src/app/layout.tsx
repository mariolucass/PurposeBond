"use client";
import { AuthProvider } from "@/contexts/authContext.context";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Head from "./head";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: ChildrenInterface) => (
  <html lang="en" suppressHydrationWarning>
    <Head />
    <AuthProvider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </AuthProvider>
  </html>
);

export default RootLayout;
