"use client";

import { Feed } from "@/components/feed";
import { MessageButton } from "@/components/messagesButton";
import { MessagesModal } from "@/components/messagesModal";
import { ModalProvider } from "@/contexts/modalContext.context";
import { PostProvider } from "@/contexts/postContext.context";
import { SideBarLeft, SideBarRight } from "@/layouts/SideBars";

const Dashboard = () => {
  return (
    <ModalProvider>
      <main className="w-full h-full items-center">
        <div className="grid grid-cols-12 min-h-screen max-w-7xl mx-auto relative">
          <div className="col-span-2 flex justify-end border-r-4">
            <SideBarLeft />
          </div>
          <div className="col-span-1"></div>

          <div className="col-span-5 p-2 border-x-2 rounded-t-2xl">
            <PostProvider>
              <Feed />
            </PostProvider>
          </div>

          <div className="col-span-1"></div>

          <div className="col-span-3 flex justify-start h-full">
            <SideBarRight />
            <MessageButton />
            <MessagesModal />
          </div>
        </div>
      </main>
    </ModalProvider>
  );
};

export default Dashboard;
