"use client";

import { Navigator } from "@/components/common/navigator";
import { SelectedInsight } from "@/layouts/InsightsPage/selectedInsight";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const insightsOptions = [
  {
    key: "overview",
    label: "Overview",
    description: "A general summary of your account’s activity and growth.",
  },
  {
    key: "engagement",
    label: "Engagement",
    description: "Insights on how users interact with your posts and profile.",
  },
  {
    key: "topPosts",
    label: "Top Posts",
    description: "Your most popular posts based on engagement metrics.",
  },
  {
    key: "badges",
    label: "Achievements",
    description: "Badges you’ve earned by interacting with the platform.",
  },
];

const Insights = () => {
  type InsightKey = (typeof insightsOptions)[number]["key"];

  const [selectedInsight, setSelectedInsight] = useState<InsightKey | null>(
    null
  );

  const currentInsight = insightsOptions.find(
    (option) => option.key === selectedInsight
  );

  return (
    <>
      <div className="col-span-4 border-r-2">
        <section className="w-full min-w-full flex flex-col justify-start">
          <Navigator name={"Insights"} />

          <ul className="w-full flex flex-col mt-4 px-2">
            {insightsOptions.map((item) => (
              <li
                key={item.key}
                className={cn(
                  "group flex items-center justify-between px-4 py-4 text-sm transition-colors hover:bg-muted cursor-pointer border-b-2",
                  selectedInsight === item.key && "bg-muted font-semibold"
                )}
                onClick={() => setSelectedInsight(item.key)}
              >
                <div className="flex flex-col ">
                  <span className="text-sm font-medium ">{item.label}</span>
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
        <SelectedInsight currentInsight={currentInsight} />
      </div>
    </>
  );
};

export default Insights;
