"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import {
  Bell,
  HomeIcon,
  LogInIcon,
  MessageSquareText,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AccountOptions } from "./accountOptions";

export const SideBarLeft = () => {
  const { authenticatedUser } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  const navigationLinks = [{ href: "/", label: "Home", icon: <HomeIcon /> }];

  if (authenticatedUser) {
    navigationLinks.push(
      { href: "/profile", label: "Profile", icon: <UserIcon /> },
      { href: "/search", label: "Search", icon: <SearchIcon /> },
      { href: "/notifications", label: "Notifications", icon: <Bell /> },
      { href: "/messages", label: "Messages", icon: <MessageSquareText /> },
      { href: "/settings", label: "Settings", icon: <SettingsIcon /> }
    );
  } else {
    navigationLinks.push(
      { href: "/login", label: "Login", icon: <LogInIcon /> },
      { href: "/signup", label: "Signup", icon: <HomeIcon /> }
    );
  }

  const isOnPath = (href: string) => pathname === href;

  const defaultNavigationClass =
    "w-[210px] h-component flex items-center gap-4 hover:bg-slate-600 p-4 hover:text-white hover:border-r-slate-800 hover:border-b-slate-800 hover:border-r-2 border-b-2 ";

  const baseItemClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm w-full";
  const activeClass = "bg-muted text-primary font-semibold";
  const hoverClass = "hover:bg-muted hover:text-primary";

  return (
    <section className="h-screen w-[220px] side-bar-left flex flex-col items-center fixed mx-auto border-r border-border bg-background text-foreground">
      <div className="w-full flex flex-col justify-start items-center pt-4">
        {authenticatedUser && (
          <div className="w-full flex p-4 items-center justify-between">
            <Avatar
              className="w-11 h-11 border border-primary cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              <AvatarImage src={authenticatedUser.profileImage} />
            </Avatar>
            <AccountOptions />
          </div>
        )}

        <ul className="w-full px-2 flex flex-col gap-1 mt-4">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <li
                className={`${baseItemClass} ${
                  isOnPath(link.href) ? activeClass : hoverClass
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};
