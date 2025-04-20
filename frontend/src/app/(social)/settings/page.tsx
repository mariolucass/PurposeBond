"use client";

import { Navigator } from "@/components/common/navigator";
import { SelectedSetting } from "@/components/settings/selectedSetting";
import { Setting, settingsList } from "@/config/settings.config";
import { useSettingContext } from "@/contexts/domains/AuthDomain/setting.context";
import { ChevronRight } from "lucide-react";

const SettingsPage = () => {
  const { setCurrentSetting } = useSettingContext();

  const handleChangeSetting = (setting: Setting) => {
    setCurrentSetting(setting);
  };

  return (
    <>
      <div className="col-span-4 border-r-2">
        <section className="w-full min-w-full flex flex-col justify-start">
          <Navigator name={"Settings"} />

          <ul className="w-full flex flex-col gap-1 mt-4">
            {settingsList.map((setting) => (
              <li
                className="min-w-full flex justify-between items-center gap-2 px-4 py-3 border-b-2 cursor-pointer text-sm"
                key={setting.name}
                onClick={() => handleChangeSetting(setting)}
              >
                {setting.name}

                <ChevronRight />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="col-span-6 flex border-r-2 justify-start h-full">
        <SelectedSetting />
      </div>
    </>
  );
};

export default SettingsPage;
