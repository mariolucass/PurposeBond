"use client";

import { ModalProvider } from "@/contexts/modal.context";
import { PostProvider } from "@/contexts/post.context";
import { Feed } from "@/layouts/Feed";
import { SideBarLeft } from "@/layouts/SideBars/sideBarLeft";
import { SideBarRight } from "@/layouts/SideBars/sideBarRight";

const Dashboard = () => {
  return (
    <ModalProvider>
      <main className="w-full h-full items-center">
        <div className="grid grid-cols-12 min-h-screen max-w-7xl mx-auto relative">
          <div className="col-span-2 flex justify-end border-r-2">
            <SideBarLeft />
          </div>

          <div className="col-span-6 border-r-2">
            <PostProvider>
              <Feed />
            </PostProvider>
          </div>

          <div className="col-span-1"></div>

          <div className="col-span-3 flex justify-start h-full">
            <SideBarRight />
          </div>
        </div>
      </main>
    </ModalProvider>
  );
};

export default Dashboard;
