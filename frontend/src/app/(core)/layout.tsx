"use client";

import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { PageTransitionWrapper } from "@/layouts/Animations/PageTransition";
import { SideBarLeft } from "@/layouts/SideBars/sideBarLeft";
import { SideBarRight } from "@/layouts/SideBars/sideBarRight";

const MainLayout = ({ children }: ChildrenInterface) => (
  <main className="w-full h-full items-center">
    <div className="grid grid-cols-12 min-h-screen max-w-7xl mx-auto relative">
      <div className="col-span-2 flex justify-end border-r-2">
        <SideBarLeft />
      </div>

      <div className="col-span-6 border-r-2">
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </div>

      <div className="col-span-1"></div>

      <div className="col-span-3 flex justify-start h-full">
        <SideBarRight />
      </div>
    </div>
  </main>
);

export default MainLayout;
