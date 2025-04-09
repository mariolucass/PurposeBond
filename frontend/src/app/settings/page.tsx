"use client";

import { Navigator } from "@/components/navigator";
import {
  Setting,
  useSettingContext,
} from "@/contexts/domains/AuthDomain/setting.context";
import { ChevronRight } from "lucide-react";

const SettingsPage = () => {
  const { setCurrentSetting, settingsList } = useSettingContext();

  const handleChangeSetting = (setting: Setting) => {
    setCurrentSetting(setting);
  };

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <Navigator name={"Settings"} />

      <ul className="w-full flex flex-col">
        {settingsList.map((setting) => (
          <li
            className="min-w-full h-component flex justify-between items-center gap-2 px-4 border-b-2 cursor-pointer"
            key={setting.name}
            onClick={() => handleChangeSetting(setting)}
          >
            {setting.name}

            <ChevronRight />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SettingsPage;
