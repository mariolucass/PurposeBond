import { IChildren } from "@/interfaces/global";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IChildren) {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState({});

  const loginUser = (body: any) => {};

  const registerUser = (body: any) => {};

  useEffect(() => {}, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
export const useAuthContext = () => useContext(AuthContext);
