"use client";

import { MessageProvider } from "@/contexts/domains/SocialDomain/message.context";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { SideBarLeft } from "@/layouts/SideBars/sideBarLeft";
import { ChatSection } from "./chatSection";

const MainLayout = ({ children }: ChildrenInterface) => (
  <MessageProvider>
    <main className="w-full h-full items-center">
      <div className="relative grid grid-cols-12 min-h-screen max-w-7xl mx-auto ">
        <div className="h-full col-span-2 flex justify-end border-r-2">
          <SideBarLeft />
        </div>

        <div className="h-full col-span-4 border-r-2">{children}</div>

        <div className="h-full col-span-6 flex justify-start border-r-2">
          <ChatSection />
        </div>
      </div>
    </main>
  </MessageProvider>
);

export default MainLayout;
