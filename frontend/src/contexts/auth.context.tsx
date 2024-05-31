import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IAuthContext {
  authenticatedUser: any | null;
  setAuthenticatedUser: Dispatch<SetStateAction<any | null>>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: ChildrenInterface) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
