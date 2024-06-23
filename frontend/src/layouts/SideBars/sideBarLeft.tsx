"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/contexts/auth.context";
import {
  Bell,
  HomeIcon,
  LogInIcon,
  MessageSquareText,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountOptions } from "./accountOptions";

export const SideBarLeft = () => {
  const { authenticatedUser } = useAuthContext();
  const pathname = usePathname();

  const navigationLinks = [{ href: "/", label: "Home", icon: <HomeIcon /> }];

  if (authenticatedUser) {
    navigationLinks.push(
      { href: "/profile", label: "Profile", icon: <UserIcon /> },
      { href: "/messages", label: "Messages", icon: <MessageSquareText /> },
      { href: "/notifications", label: "Notifications", icon: <Bell /> },
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
    "w-[210px] flex gap-4 hover:bg-slate-600 p-4 rounded-lg hover:text-white hover:border-r-slate-800 hover:border-b-slate-800 hover:border-r-2 border-b-2 border-r-2 ";

  return (
    <section className="side-bar-left flex flex-col justify-start items-center gap-16 fixed mx-auto mt-8">
      <div className="w-full gap-4 flex flex-col justify-start rounded-2xl h-96 p-4 pt-0 items-center">
        {authenticatedUser && (
          <div className="flex p-4 border-b-2 border-r-2 rounded-2xl rounded-t-none items-center justify-between w-[210px]">
            <Avatar className="w-[64px] h-[64px] border-primary">
              <AvatarImage src={authenticatedUser.profileImage} />
            </Avatar>

            <AccountOptions />
          </div>
        )}

        <ul className="w-full flex flex-col space-y-8 p-4">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <li
                className={
                  isOnPath(link.href)
                    ? `${defaultNavigationClass} text-decoration-line: underline font-bold `
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
