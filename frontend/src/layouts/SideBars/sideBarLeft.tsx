"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/contexts/auth.context";
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

  return (
    <section className="h-screen side-bar-left flex flex-col items-center fixed mx-auto">
      <div className="w-full flex flex-col justify-start items-center pt-0">
        {authenticatedUser && (
          <div className="w-[210px] h-component flex p-4 border-b-2 items-center justify-between cursor-pointer ">
            <Avatar
              className="w-[48px] h-[48px] border-primary hover:animate-pulse"
              onClick={() => router.push("/profile")}
            >
              <AvatarImage src={authenticatedUser.profileImage} />
            </Avatar>

            <AccountOptions />
          </div>
        )}

        <ul className="w-full flex flex-col">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <li
                className={
                  isOnPath(link.href)
                    ? `${defaultNavigationClass} font-bold`
                    : `${defaultNavigationClass} `
                }
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
