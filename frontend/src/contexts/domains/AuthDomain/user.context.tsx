"use client";

import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { createContext, useContext } from "react";

interface IUserContext {}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: ChildrenInterface) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
