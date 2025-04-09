import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import { GlobalProvider } from "@/contexts";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { PageTransitionWrapper } from "@/layouts/Animations/PageTransition";
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

    <GlobalProvider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className
        )}
      >
        <PageTransitionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </PageTransitionWrapper>
        <Toaster />
      </body>
    </GlobalProvider>
  </html>
);

export default RootLayout;
