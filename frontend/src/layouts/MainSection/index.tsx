import { IChildren } from "@/interfaces/global.interfaces";

export const MainSection = ({ children }: IChildren) => (
  <section className="border-x-4 gap-4 w-4/6 flex flex-col justify-start">
    {children}
  </section>
);
