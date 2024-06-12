"use client";

import Link from "next/link";

export const SideBarLeft = () => {
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
    { href: "/about", label: "About" },
    { href: "/notifications", label: "Notifications" },
  ];

  return (
    <section className="side-bar-left min-h-full flex flex-col justify-start items-center gap-16 fixed mt-8 mx-auto ">
      <div className="w-full  gap-4 flex flex-col justify-start rounded-2xl h-96 mt-24 p-4">
        <ul className="w-full space-y-4 p-4">
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
