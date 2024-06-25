"use client";

import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth.context";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { cn } from "@/lib/utils";
import { Nunito_Sans as FontSans } from "next/font/google";
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
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.className
          )}
        >
          {children}

          <Toaster />
        </body>
      </ThemeProvider>
    </AuthProvider>
  </html>
);

export default RootLayout;
