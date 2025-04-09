"use client";

import { DeleteAccount } from "@/components/settings/deleteAccount";
import { FontSelector } from "@/components/settings/fontSelector";
import { LanguageSelector } from "@/components/settings/languageSelector";
import { ThemeSelector } from "@/components/settings/themeSelector";
import { Switch } from "@/components/ui/switch";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { Dispatch, createContext, useContext, useState } from "react";

interface ISettingContext {
  currentSetting: any;
  setCurrentSetting: Dispatch<any>;
  settingsList: Setting[];
}

export interface Setting {
  name: string;
  description: string;
  settings: any[];
}

const SettingContext = createContext<ISettingContext>({} as ISettingContext);

export const SettingProvider = ({ children }: ChildrenInterface) => {
  const [currentSetting, setCurrentSetting] = useState<any | null>(null);

  const settingsList: Setting[] = [
    {
      name: "Your Account",
      description:
        "Manage your personal information, preferences, and security options. ",
      settings: [
        {
          name: "Email Notifications",
          setting: "emailNotifications",
          component: <Switch />,
        },
        {
          name: "Private Profile",
          setting: "privateProfile",
          component: <Switch />,
        },
        {
          name: "Language",
          setting: "language",
          component: <LanguageSelector />,
        },
        {
          name: "Delete Account",
          setting: "delete",
          component: <DeleteAccount />,
        },
      ],
    },
    {
      name: "Personalization",
      description: "Tailor your website experience to match your unique taste.",
      settings: [
        {
          name: "Theme",
          setting: "theme",
          component: <ThemeSelector />,
        },
        {
          name: "Font",
          setting: "theme",
          component: <FontSelector />,
        },
        {
          name: "Font Size",
          setting: "theme",

          component: <FontSelector />,
        },
      ],
    },
  ];

  return (
    <SettingContext.Provider
      value={{ settingsList, currentSetting, setCurrentSetting }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSettingContext = () => useContext(SettingContext);
