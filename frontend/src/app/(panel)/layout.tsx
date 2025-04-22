"use client";

import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { SideBarLeft } from "@/layouts/SideBars/sideBarLeft";

const MainLayout = ({ children }: ChildrenInterface) => (
  <main className="w-full h-full items-center">
    <div className="grid grid-cols-12 min-h-screen max-w-7xl mx-auto relative">
      <div className="col-span-2 flex justify-end border-r-2">
        <SideBarLeft />
      </div>

      {children}
    </div>
  </main>
);

export default MainLayout;
