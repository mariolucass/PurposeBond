"use client";

import { Navigator } from "@/components/navigator";
import { SettingsList } from "./settingsList";

const SettingsPage = () => {
  return (
    <section className="w-full min-w-full flex flex-col gap-4 justify-start">
      <Navigator name={"Settings"} />
      <SettingsList />
    </section>
  );
};

export default SettingsPage;
