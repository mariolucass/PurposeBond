import { IChildren } from "@/interfaces/global.interfaces";
import { UserContextInterface } from "@/interfaces/users.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IAuthContext {
  user: UserContextInterface;
  setUser: Dispatch<SetStateAction<UserContextInterface>>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState({} as UserContextInterface);

  const loginUser = (body: any) => {};

  const registerUser = (body: any) => {};

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
