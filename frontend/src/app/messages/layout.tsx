"use client";

import { MessageProvider } from "@/contexts/message.context";
import { ModalProvider } from "@/contexts/modal.context";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { SideBarLeft } from "@/layouts/SideBars/sideBarLeft";

const MainLayout = ({ children }: ChildrenInterface) => (
  <ModalProvider>
    <main className="w-full h-full items-center">
      <div className="grid grid-cols-12 min-h-screen max-w-7xl mx-auto relative">
        <div className="col-span-2 flex justify-end border-r-2">
          <SideBarLeft />
        </div>

        <div className="col-span-4 border-r-2">
          <MessageProvider>{children}</MessageProvider>
        </div>

        <div className="col-span-6 flex border-r-2 justify-start h-full"></div>
      </div>
    </main>
  </ModalProvider>
);

export default MainLayout;
