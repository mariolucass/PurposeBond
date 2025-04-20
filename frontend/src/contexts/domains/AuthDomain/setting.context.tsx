"use client";

import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { Dispatch, createContext, useContext, useState } from "react";

interface ISettingContext {
  currentSetting: any;
  setCurrentSetting: Dispatch<any>;
}

const SettingContext = createContext<ISettingContext>({} as ISettingContext);

export const SettingProvider = ({ children }: ChildrenInterface) => {
  const [currentSetting, setCurrentSetting] = useState<any | null>(null);

  return (
    <SettingContext.Provider value={{ currentSetting, setCurrentSetting }}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSettingContext = () => useContext(SettingContext);
