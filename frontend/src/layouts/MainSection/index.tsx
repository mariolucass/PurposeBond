import { ChildrenInterface } from "@/interfaces/global.interfaces";

export const MainSection = ({ children }: ChildrenInterface) => (
  <section className="border-x-4 gap-4 w-4/6 flex flex-col justify-start">
    {children}
  </section>
);
