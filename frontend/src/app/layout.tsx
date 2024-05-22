import { IChildren } from "@/interfaces/global.interfaces";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Head from "./head";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: IChildren) => (
  <html lang="en" suppressHydrationWarning>
    <Head />

    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
