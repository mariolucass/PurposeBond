import { IChildren } from "@/interfaces/global";
import { createContext, useContext } from "react";

interface IUserContext {}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: IChildren) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
