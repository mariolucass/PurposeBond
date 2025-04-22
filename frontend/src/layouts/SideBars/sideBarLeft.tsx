"use client";

import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { cn } from "@/lib/utils";
import {
  Bell,
  HomeIcon,
  LineChart,
  LogInIcon,
  Medal,
  MessageSquareText,
  Network,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserHeaderCard } from "./userHeaderCard";

export const SideBarLeft = () => {
  const { authenticatedUser } = useAuthContext();
  const pathname = usePathname();

  const navigationLinks = [{ href: "/", label: "Home", icon: <HomeIcon /> }];

  if (authenticatedUser) {
    navigationLinks.push(
      { href: "/profile", label: "Profile", icon: <UserIcon /> },
      { href: "/search", label: "Search", icon: <SearchIcon /> },
      { href: "/communities", label: "Communities", icon: <LineChart /> },
      { href: "/messages", label: "Messages", icon: <MessageSquareText /> },
      { href: "/notifications", label: "Notifications", icon: <Bell /> },
      { href: "/insights", label: "Insights", icon: <Network /> },
      { href: "/badges", label: "Badges", icon: <Medal /> },
      { href: "/settings", label: "Settings", icon: <SettingsIcon /> }
    );
  } else {
    navigationLinks.push(
      { href: "/login", label: "Login", icon: <LogInIcon /> },
      { href: "/signup", label: "Signup", icon: <HomeIcon /> }
    );
  }

  const isOnPath = (href: string) => pathname === href;

  const baseItemClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm w-full";
  const activeClass = "bg-muted text-primary font-semibold";
  const hoverClass = "hover:bg-muted hover:text-primary";

  return (
    <section className="h-screen w-[220px] side-bar-left flex flex-col items-center fixed mx-auto bg-background text-foreground">
      <div className="w-full flex flex-col justify-start items-center">
        <UserHeaderCard />

        <ul className="w-full px-2 flex flex-col gap-1 mt-4">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <li
                className={cn(
                  baseItemClass,
                  isOnPath(link.href) ? activeClass : hoverClass
                )}
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};
