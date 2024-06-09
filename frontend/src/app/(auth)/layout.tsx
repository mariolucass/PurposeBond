import { ChildrenInterface } from "@/interfaces/global.interfaces";

const AuthLayout = ({ children }: ChildrenInterface) => (
  <main className="w-full flex min-h-screen">
    <div className="w-1/3 min-h-screen bg-primary" />

    <div className="w-2/5 flex flex-col min-h-screen bg-background justify-center m-auto">
      {children}
    </div>
  </main>
);

export default AuthLayout;
