"use client";

import { Navigator } from "@/components/common/navigator";
import { SelectedBadge } from "@/layouts/BadgesPage/selectedBadge";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const badgeOptions = [
  {
    key: "posting",
    label: "Posting",
    description: "Badges related to creating content and engaging with posts.",
  },
  {
    key: "engagement",
    label: "Engagement",
    description: "Badges for receiving likes, comments and reposts.",
  },
  {
    key: "community",
    label: "Community",
    description: "Badges for joining and contributing to communities.",
  },
  {
    key: "profile",
    label: "Profile",
    description: "Badges for completing your profile and customization.",
  },
];

type BadgeKey = (typeof badgeOptions)[number]["key"];

const Badges = () => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeKey | null>(null);

  const currentBadge = badgeOptions.find(
    (option) => option.key === selectedBadge
  );

  return (
    <>
      <div className="col-span-4 border-r-2">
        <section className="w-full min-w-full flex flex-col justify-start">
          <Navigator name="Badges" />

          <ul className="w-full flex flex-col mt-4 px-2">
            {badgeOptions.map((item) => (
              <li
                key={item.key}
                className={cn(
                  "group flex items-center justify-between px-4 py-4 text-sm transition-colors hover:bg-muted cursor-pointer border-b-2",
                  selectedBadge === item.key && "bg-muted font-semibold"
                )}
                onClick={() => setSelectedBadge(item.key)}
              >
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>

                <ChevronRight className="mt-1 h-4 w-4 opacity-50 group-hover:opacity-100 transition" />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="col-span-6 flex border-r-2 justify-start h-full">
        <SelectedBadge currentBadge={currentBadge} />
      </div>
    </>
  );
};

export default Badges;
