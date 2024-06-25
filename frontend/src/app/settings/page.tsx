"use client";

import { Navigator } from "@/components/navigator";

const SettingsPage = () => {
  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <Navigator name={"Settings"} />

      <ul className="w-full flex flex-col">
        <li className="min-w-full h-component flex items-center gap-2 px-4 border-b-2">
          Your account
        </li>

        <li className="min-w-full h-component flex items-center gap-2 px-4 border-b-2">
          Personalization
        </li>
      </ul>
    </section>
  );
};

export default SettingsPage;
