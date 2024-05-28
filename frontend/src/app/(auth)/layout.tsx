import { ChildrenInterface } from "@/interfaces/global.interfaces";

const AuthLayout = ({ children }: ChildrenInterface) => (
  <main className=" w-full min-h-screen items-center justify-center flex">
    {children}
  </main>
);

export default AuthLayout;
