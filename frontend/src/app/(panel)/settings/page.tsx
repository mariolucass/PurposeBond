"use client";

import { Navigator } from "@/components/common/navigator";
import { Setting, settingsList } from "@/config/settings.config";
import { SelectedSetting } from "@/layouts/SettingsPage/selectedSetting";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SettingsPage = () => {
  const [currentSetting, setCurrentSetting] = useState<Setting | null>(null);

  return (
    <>
      <div className="col-span-4 border-r-2">
        <section className="w-full min-w-full flex flex-col justify-start">
          <Navigator name={"Settings"} />

          <ul className="w-full flex flex-col mt-4 px-2">
            {settingsList.map((item) => (
              <li
                key={item.name}
                className={cn(
                  "group flex items-center justify-between px-4 py-4 text-sm transition-colors hover:bg-muted cursor-pointer border-b-2",
                  currentSetting === item && "bg-muted font-semibold"
                )}
                onClick={() => setCurrentSetting(item)}
              >
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="col-span-6 flex border-r-2 justify-start h-full">
        <SelectedSetting currentSetting={currentSetting} />
      </div>
    </>
  );
};

export default SettingsPage;
