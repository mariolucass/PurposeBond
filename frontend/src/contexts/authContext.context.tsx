import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { UserInterface } from "@/interfaces/users.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IAuthContext {
  user: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface>>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: ChildrenInterface) => {
  const [user, setUser] = useState({} as UserInterface);

  const loginUser = (body: any) => {};

  const registerUser = (body: any) => {};

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
