import { IChildren } from "@/interfaces/global.interfaces";

export const Container = ({ children }: IChildren) => (
  <div className="w-full h-full max-w-7xl mx-auto my-auto flex p-8 lg:min-h-screen justify-between relative">
    {children}
  </div>
);
