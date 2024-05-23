import { IChildren } from "@/interfaces/global.interfaces";
import { UserReturnInterface } from "@/interfaces/users.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: {
    username: string;
    email: string;
    password: string;
    description: string;
    posts: {
      id: string;
      content: string;
      createdAt: Date;
    }[];
    comments: {
      email: string;
      password: string;
    }[];
  };
  setUser: Dispatch<
    SetStateAction<{
      username: string;
      email: string;
      password: string;
      description: string;
      posts: {
        id: string;
        content: string;
        createdAt: Date;
      }[];
      comments: {
        email: string;
        password: string;
      }[];
    }>
  >;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IChildren) {
  const [user, setUser] = useState({} as UserReturnInterface);
  const [isLogged, setIsLogged] = useState({});

  const [token, setToken] = useState();

  const loginUser = (body: any) => {};

  const registerUser = (body: any) => {};

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthContext = () => useContext(AuthContext);
