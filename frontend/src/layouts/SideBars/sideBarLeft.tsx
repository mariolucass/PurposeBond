"use client";

import { useAuthContext } from "@/contexts/auth.context";
import Link from "next/link";

export const SideBarLeft = () => {
  const { authenticatedUser } = useAuthContext();

  const navigationLinks = [{ href: "/", label: "Home" }];

  if (authenticatedUser) {
    navigationLinks.push(
      { href: "/profile", label: "Profile" },
      { href: "/settings", label: "Settings" },
      { href: "/notifications", label: "Notifications" }
    );
  } else {
    navigationLinks.push(
      { href: "/login", label: "Login" },
      { href: "/signup", label: "Signup" }
    );
  }

  return (
    <section className="side-bar-left min-h-full flex flex-col justify-start items-center gap-16 fixed mt-8 mx-auto ">
      <div className="w-full  gap-4 flex flex-col justify-start rounded-2xl h-96 mt-24 p-4">
        <ul className="w-full space-y-8 p-4">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
